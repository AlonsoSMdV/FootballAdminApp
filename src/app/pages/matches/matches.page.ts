import { Component, Inject, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, catchError, combineLatest, finalize, firstValueFrom, map, Observable, of, switchMap } from 'rxjs';
import { Match } from 'src/app/core/models/matches.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Team } from 'src/app/core/models/teams.model';
import { PLAYER_COLLECTION_SUBSCRIPTION_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { MatchService } from 'src/app/core/services/impl/match.service';
import { TeamService } from 'src/app/core/services/impl/team.service';
import { CollectionChange, ICollectionSubscription } from 'src/app/core/services/interfaces/collection-subscription.interface';
import { LanguageService } from 'src/app/core/services/language.service';
import { MatchCreateComponent } from 'src/app/shared/components/match-create/match-create.component';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { UsersService } from 'src/app/core/services/impl/users.service';

interface MatchWithTeams extends Match {
  localTeam?: Team;
  visitorTeam?: Team;
}

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {
  isLoading: boolean = false;
  img: string|undefined = './../../../assets/img/imgCard2.jpg'
  currentLang:string
  _matches: BehaviorSubject<MatchWithTeams[]> = new BehaviorSubject<MatchWithTeams[]>([])
  matches$: Observable<MatchWithTeams[]> = this._matches.asObservable()
  isAdmin: boolean = false;
  currentUserId: string = '';
  private loadedIds: Set<string> = new Set();


  constructor(
    private userSvc: UsersService,
    private matchSvc: MatchService,
    private teamSvc: TeamService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private languageService: LanguageService,
    @Inject(PLAYER_COLLECTION_SUBSCRIPTION_TOKEN)
    private matchSubs: ICollectionSubscription<Match>
  ) {
    this.currentLang = this.languageService.getStoredLanguage();
   }

  ngOnInit() {
    this.getMatches()

    this.userSvc.getCurrentUser().subscribe(user => {
      this.isAdmin = user?.role === 'Admin';
    });

     // Revisa y actualiza estado de partidos cada minuto
    setInterval(() => {
      this.updateMatchStatuses();
    }, 60 * 1000);

    this.matchSubs.subscribe('matches').subscribe((change:
          CollectionChange<MatchWithTeams>) => {
              const currentLeague = [...this._matches.value];
    
              if ((!this.loadedIds.has(change.id) && change.type !== 'added')) {
                return;
              }
    
              switch(change.type){
                case 'added':
                case 'modified':
                  const index = currentLeague.findIndex(p => p.id === change.id)
                  if (index >= 0) {
                    currentLeague[index] = change.data!;
                  }
                  break;
                case 'removed':
                  const removedIndex = currentLeague.findIndex(p => p.id === change.id)
                  if (removedIndex >= 0) {
                    currentLeague.splice(removedIndex, 1);
                    this.loadedIds.delete(change.id);
                  }
                  break;
              }
    
              this._matches.next(currentLeague)
          });
  }
  

  selectedMatch: any = null
    page: number = 1;
    pageSize:number = 25;
    pages:number = 0;
  
    getMatches() {
      this.page = 1;
      this.matchSvc.getAll(this.page, this.pageSize).subscribe({
        next: async (response: Paginated<Match>) => {
          // Actualizar el registro de IDs cargados
          response.data.forEach(match => this.loadedIds.add(match.id));
          try {
            const matchesWithTeams = await Promise.all(
              response.data.map(async (match) => {
                const [localTeam, visitorTeam] = await Promise.all([
                  match.localTeamId ? firstValueFrom(this.teamSvc.getById(match.localTeamId)) : Promise.resolve(null),
                  match.visitorTeamId ? firstValueFrom(this.teamSvc.getById(match.visitorTeamId)) : Promise.resolve(null)
                ]);
                return { ...match, localTeam: localTeam || undefined, visitorTeam: visitorTeam || undefined };
              })
            );
            this._matches.next(matchesWithTeams);
            this.page++;
            this.pages = response.pages;
          } catch (error) {
            console.error('Error fetching team data:', error);
          }
        },
        error: (err) => {
          console.error('Error fetching matches:', err);
        }
      });
    }
    
    getMoreMatches(notify: HTMLIonInfiniteScrollElement | null = null) {
      this.matchSvc.getAll(this.page, this.pageSize).subscribe({
        next: async (response: Paginated<Match>) => {
          // Actualizar el registro de IDs cargados
          response.data.forEach(match => this.loadedIds.add(match.id));
          try {
            const matchesWithTeams = await Promise.all(
              response.data.map(async (match) => {
                const [localTeam, visitorTeam] = await Promise.all([
                  match.localTeamId ? firstValueFrom(this.teamSvc.getById(match.localTeamId)) : Promise.resolve(null),
                  match.visitorTeamId ? firstValueFrom(this.teamSvc.getById(match.visitorTeamId)) : Promise.resolve(null)
                ]);
                return { ...match, localTeam: localTeam || undefined, visitorTeam: visitorTeam || undefined };
              })
            );
            this._matches.next([...this._matches.value, ...matchesWithTeams]);
            this.page++;
            notify?.complete();
          } catch (error) {
            console.error('Error fetching additional team data:', error);
            notify?.complete();
          }
        },
        error: (err) => {
          console.error('Error fetching additional matches:', err);
          notify?.complete();
        }
      });
    } 
    
    async openMatch(match: any, index: number){
        await this.presentModalMatch('edit', match)
        this.selectedMatch
      }
    
      private async presentModalMatch(mode:'new'|'edit', match:Match|undefined=undefined){
        const modal = await this.modalCtrl.create({
          component:MatchCreateComponent,
          componentProps:(mode=='edit'?{
            match: match
          }:{})
        });
        modal.onDidDismiss().then(async (response)=>{
          const user = await firstValueFrom(this.userSvc.getCurrentUser());

          let newMatch : any = null
            newMatch = {
              day: response.data.day,
              hour: response.data.hour,
              result: response.data.result,
              place: response.data.place,
              status: "Por jugar",
              localTeamId: response.data.localTeamId,
              visitorTeamId: response.data.visitorTeamId,
              userId: user?.id
            }

            let editMatch : any = null
            editMatch = {
              day: response.data.day,
              hour: response.data.hour,
              result: response.data.result,
              place: response.data.place,
              status: response.data.status,
              localTeamId: response.data.localTeamId,
              visitorTeamId: response.data.visitorTeamId,
              userId: response.data.userId
            }
            
          switch (response.role) {
            case 'new':
              this.matchSvc.add(newMatch).subscribe({
                next:res=>{
                  this.getMatches();
                },
                error:err=>{}
              });
              break;
            case 'edit':
              this.matchSvc.update(match!.id, editMatch).subscribe({
                next:res=>{
                  this.getMatches();
                },
                error:err=>{}
              });
              break;
            default:
              break;
          }
        });
        await modal.present();
      }
    
      async onAddMatch(){
        await this.presentModalMatch('new');
      }


    async onDeleteMatch(match: Match) {
      const alert = await this.alertCtrl.create({
        header: await this.translate.get('MATCHES.MESSAGES.DELETE_CONFIRM').toPromise(),
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'OK',
            role: 'yes',
            handler: () => {
              this.matchSvc.delete(match.id).subscribe({
                next: response => {
                  this.getMatches();
                },
                error: err => {}
              });
            }
          }
        ]
      });
  
      await alert.present();
    }

    private updateMatchStatuses() {
  const now = new Date();

  const updatedMatches = this._matches.value.map((match) => {
    if (!match.day || !match.hour || !match.status || !match.id) return match;

    const dayParts = match.day.toString().split('/');
    const hourParts = match.hour.toString().split(':');
    if (dayParts.length !== 3 || hourParts.length !== 2) return match;

    const [day, month, year] = dayParts.map(Number);
    const [hour, minute] = hourParts.map(Number);
    if ([day, month, year, hour, minute].some(isNaN)) return match;

    const matchDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(matchDate.getTime() + 2 * 60 * 60 * 1000); // +2 horas

    let newStatus = match.status;
    let newResult = match.result;

    if (now >= matchDate && now < endDate && match.status === 'Por jugar') {
      newStatus = 'Jugando';
    } else if (now >= endDate && match.status !== 'Finalizado') {
      newStatus = 'Finalizado';
      // Generar resultado aleatorio al finalizar
      const localScore = Math.floor(Math.random() * 5); // 0-4
      const visitorScore = Math.floor(Math.random() * 5); // 0-4
      newResult = `${localScore} - ${visitorScore}`;
    }

    if (newStatus !== match.status) {
      const updated: any = {
        day: match.day,
        hour: match.hour,
        result: newResult,
        place: match.place,
        status: newStatus,
        localTeamId: match.localTeamId,
        visitorTeamId: match.visitorTeamId
      };

      this.matchSvc.update(match.id, updated).subscribe({
        next: () => {
          console.log(`Status actualizado a "${newStatus}" para ${match.id}`);
          window.location.reload();
        },
        error: (err) => console.error('Error actualizando status', err)
      });

      return updated;
    }

    return match;
  });

  this._matches.next(updatedMatches);
}

    
    

    async shareMatch(match: MatchWithTeams) {
      try {
        // Formateamos la información del partido de manera atractiva
        const localTeamName = match.localTeam?.name || 'Equipo Local';
        const visitorTeamName = match.visitorTeam?.name || 'Equipo Visitante';
        const matchDay = match.day ? new Date(match.day).toLocaleDateString(this.currentLang) : 'Fecha por confirmar';
        const matchHour = match.hour ? new Date(`2000-01-01T${match.hour}`).toLocaleTimeString(this.currentLang, { hour: '2-digit', minute: '2-digit' }) : 'Hora por confirmar';
        const matchPlace = match.place || 'Lugar por confirmar';
        const matchResult = match.result || 'Resultado pendiente';
        
        // Crear el texto para compartir
        const shareText = `${localTeamName} vs ${visitorTeamName}\n` +
                          `${this.translate.instant('MATCH.DATE')}: ${matchDay}\n` +
                          `${this.translate.instant('MATCH.TIME')}: ${matchHour}\n` +
                          `${this.translate.instant('MATCH.PLACE')}: ${matchPlace}\n` +
                          `${this.translate.instant('MATCH.RESULT')}: ${matchResult}`;
        
        // Usar Capacitor Share si estamos en un dispositivo nativo
        if (Capacitor.isNativePlatform()) {
          await Share.share({
            title: `${localTeamName} vs ${visitorTeamName}`,
            text: shareText,
            dialogTitle: this.translate.instant('MATCH.SHARE_DIALOG_TITLE')
          });
        } else {
          // Fallback para navegadores web usando la API Web Share si está disponible
          if (navigator.share) {
            await navigator.share({
              title: `${localTeamName} vs ${visitorTeamName}`,
              text: shareText,
              url: 'matches'
            });
          } else {
            // Si no hay API de compartir, mostramos un simple alert
            const alert = await this.alertCtrl.create({
              header: this.translate.instant('MATCH.SHARE_NOT_AVAILABLE'),
              message: shareText,
              buttons: ['OK']
            });
            await alert.present();
          }
        }
      } catch (error) {
        console.error('Error sharing match:', error);
        // Opcionalmente, mostrar un mensaje de error al usuario
      }
    }

    onMatchDropped(event: { fromIndex: number, toIndex: number }) {
      const matchesArray = [...this._matches.value];
    
      if (event.fromIndex !== event.toIndex) {
        // Remueve el equipo de su posición original
        const movedItem = matchesArray.splice(event.fromIndex, 1)[0];
    
        // Inserta el equipo en la nueva posición
        matchesArray.splice(event.toIndex, 0, movedItem);
    
        // Actualiza el BehaviorSubject con la nueva lista ordenada
        this._matches.next(matchesArray);
      }
    }
}
