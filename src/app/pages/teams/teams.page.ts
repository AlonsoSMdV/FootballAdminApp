import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Team } from 'src/app/core/models/teams.model';
import { Users } from 'src/app/core/models/users.model';
import { TEAM_COLLECTION_SUBSCRIPTION_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { TeamService } from 'src/app/core/services/impl/team.service';
import { UsersService } from 'src/app/core/services/impl/users.service';
import { CollectionChange, ICollectionSubscription } from 'src/app/core/services/interfaces/collection-subscription.interface';
import { LanguageService } from 'src/app/core/services/language.service';
import { TeamCreateModalComponent } from 'src/app/shared/components/team-create-modal/team-create-modal.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  img: string|undefined = './../../../assets/img/imgCard2.jpg'
  currentLang:string
  _teams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  teams$: Observable<Team[]> = this._teams.asObservable();
  currentUserId!: string | undefined;
  currentUser: Users | null = null;
  @Input() leagueId!: string
  private loadedIds: Set<string> = new Set();

  constructor(
    private userSvc: UsersService,
    private route: ActivatedRoute,
    private teamSvc: TeamService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private languageService: LanguageService,
    private mediaSvc: BaseMediaService,
    @Inject(TEAM_COLLECTION_SUBSCRIPTION_TOKEN)
    private TeamSubs: ICollectionSubscription<Team>
  ) { 
    this.currentLang = this.languageService.getStoredLanguage();
  }

  ngOnInit() {
    this.userSvc.getCurrentUser().subscribe(user => {
      this.currentUserId = user!!.userId;
      this.currentUser = user
    });

    this.route.paramMap.subscribe(params => {
      const leagueId = params.get('id');
      if (leagueId) {
        this.leagueId = leagueId;
        this.getTeamsByleague();
      } else {
        this.getTeams();
      }
  
      this.TeamSubs.subscribe('teams').subscribe((change: CollectionChange<Team>) => {
        let currentTeams = [...this._teams.value];
  
        if ((!this.loadedIds.has(change.id) && change.type !== 'added')) {
          return;
        }
  
        switch (change.type) {
          case 'added':
          case 'modified':
            const index = currentTeams.findIndex(p => p.id === change.id);
            if (index >= 0) {
              currentTeams[index] = change.data!;
            } else {
              currentTeams.push(change.data!);
              this.loadedIds.add(change.id);
            }
            break;
          case 'removed':
            currentTeams = currentTeams.filter(p => p.id !== change.id);
            this.loadedIds.delete(change.id);
            break;
        }
  
        // Ordenar por puntos antes de actualizar la lista
        this._teams.next(currentTeams.sort((a, b) => b.pts - a.pts));
      });
    });
  }

  selectedLeague: any = null
  selectedTeam: any = null
  page: number = 1;
  pageSize:number = 25;
  pages:number = 0;

  getTeams() {
    this.page = 1;
    this.teamSvc.getAll(this.page, this.pageSize).subscribe({
      next: (response: Paginated<Team>) => {
        response.data.forEach(team => this.loadedIds.add(team.id));
  
        // Ordenar los equipos por puntos (de mayor a menor)
        const sortedTeams = response.data.sort((a, b) => b.pts - a.pts);
  
        this._teams.next(sortedTeams);
        this.page++;
        this.pages = response.pages;
      }
    });
  }
  
  getMoreTeams(notify: HTMLIonInfiniteScrollElement | null = null) {
    this.teamSvc.getAll(this.page, this.pageSize).subscribe({
      next: (response: Paginated<Team>) => {
        response.data.forEach(team => this.loadedIds.add(team.id));
  
        // Añadir y ordenar por puntos
        const sortedTeams = [...this._teams.value, ...response.data].sort((a, b) => b.pts - a.pts);
  
        this._teams.next(sortedTeams);
        this.page++;
        notify?.complete();
      }
    });
  }

  getTeamsByleague() {
    this.page = 1;
    this.teamSvc.getTeamByLeague(this.leagueId,this.page, this.pageSize).subscribe({
      next: (response: Paginated<Team>) => {
        response.data.forEach(team => this.loadedIds.add(team.id));
  
        // Ordenar los equipos por puntos (de mayor a menor)
        const sortedTeams = response.data.sort((a, b) => b.pts - a.pts);
  
        this._teams.next(sortedTeams);
        this.page++;
        this.pages = response.pages;
      }
    });
  }
  
  getMoreTeamsByLeague(notify: HTMLIonInfiniteScrollElement | null = null) {
    this.teamSvc.getTeamByLeague(this.leagueId,this.page, this.pageSize).subscribe({
      next: (response: Paginated<Team>) => {
        response.data.forEach(team => this.loadedIds.add(team.id));
  
        // Añadir y ordenar por puntos
        const sortedTeams = [...this._teams.value, ...response.data].sort((a, b) => b.pts - a.pts);
  
        this._teams.next(sortedTeams);
        this.page++;
        notify?.complete();
      }
    });
  }

  async setFavoriteTeam(teamId: string | null) {
      try {
        
        const updatedUser: any = {
          ...this.currentUser,
          teamFav: teamId ? teamId : undefined  // 👈 Aquí está el truco
        };
    
        await firstValueFrom(this.userSvc.update(this.currentUser!!.id, updatedUser));
        this.userSvc.getCurrentUser().subscribe(user => {
          this.currentUserId = user!!.userId;
          this.currentUser = user
        });
        console.log('Favorite team updated:', teamId);
      } catch (err) {
        console.error('Error setting favorite team:', err);
      }
    }
    
    toggleFavorite(team: Team) {
      const isFavorite = this.currentUser?.teamFav === team.id;
      const newTeamFav = isFavorite ? null : team.id;
    
      this.setFavoriteTeam(newTeamFav);
    }

  async updatePoints(team: Team) {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('TEAMS.UPDATE_POINTS'),
      message: this.translate.instant('TEAMS.CHOOSE_RESULT'),
      buttons: [
        {
          text: this.translate.instant('TEAMS.WIN'),
          handler: () => this.changeTeamPoints(team, 3),
        },
        {
          text: this.translate.instant('TEAMS.DRAW'),
          handler: () => this.changeTeamPoints(team, 1),
        },
        {
          text: this.translate.instant('TEAMS.LOSS'),
          handler: () => this.changeTeamPoints(team, 0),
        },
        {
          text: this.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
        },
      ],
    });
  
    await alert.present();
  }

  changeTeamPoints(team: Team, pointsToAdd: number) {
    const updatedTeam = { 
      ...team, 
      pts: team.pts + pointsToAdd,
      nMatches: (team.nMatches || 0) + 1 // Incrementamos partidos jugados
    };
  
    this.teamSvc.update(team.id, updatedTeam).subscribe({
      next: () => {
        this.leagueId ? this.getTeamsByleague() : this.getTeams(); // Recargar equipos después de la actualización
      },
      error: (err) => console.error(err),
    });
  }

  
  async openTeam(team: any, index: number){
    await this.presentModalTeam('edit', team)
    this.selectedTeam
  }

  private async presentModalTeam(mode:'new'|'edit', team:Team|undefined=undefined){
    const modal = await this.modalCtrl.create({
      component:TeamCreateModalComponent,
      componentProps:(mode=='edit'?{
        team: team
      }:{})
    });
    modal.onDidDismiss().then(async (response)=>{
          const user = await firstValueFrom(this.userSvc.getCurrentUser());
          let newTeam : any = null
          if (response.data.picture) {
            const base64Response = await fetch(response.data.picture);
            const blob = await base64Response.blob();
            const uploadedBlob = await lastValueFrom(this.mediaSvc.upload(blob));
            const pictureUrl = uploadedBlob.map(url => url.toString())
            response.data.picture = pictureUrl
      
            newTeam = {
              name: response.data.name,
              numberOfPlayers: response.data.numberOfPlayers,
              pts: mode === 'new' ? 0 : response.data.pts,
              isFavourite: mode === 'new' ? false : response.data.isFavourite,
              nMatches: mode === 'new' ? 0 : response.data.nMatches,
              picture: {
                url: pictureUrl[0],
                large: pictureUrl[0],
                medium: pictureUrl[0],
                small: pictureUrl[0],
                thumbnail: pictureUrl[0],
              },
              userId: user!!.userId,
              league: response.data.league
            }
          }else{
            newTeam = {
              name: response.data.name,
              numberOfPlayers: response.data.numberOfPlayers,
              pts: mode === 'new' ? 0 : response.data.pts,
              isFavourite: mode === 'new' ? false : response.data.isFavourite,
              nMatches: mode === 'new' ? 0 : response.data.nMatches,
              league: response.data.league,
              userId: user!!.userId
            }
          }
      switch (response.role) {
        case 'new':
          this.teamSvc.add(newTeam).subscribe({
            next:res=>{
              this.leagueId ? this.getTeamsByleague() : this.getTeams();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.teamSvc.update(team!.id, newTeam).subscribe({
            next:res=>{
              this.leagueId ? this.getTeamsByleague() : this.getTeams();
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

  async onAddTeam(){
    await this.presentModalTeam('new');
  }

  async onDeleteTeam(team: Team) {
    const alert = await this.alertCtrl.create({
      header: await this.translate.get('TEAMS.MESSAGES.DELETE_CONFIRM').toPromise(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'yes',
          handler: () => {
            this.teamSvc.delete(team.id).subscribe({
              next: response => {
                this.leagueId ? this.getTeamsByleague() : this.getTeams();
              },
              error: err => {}
            });
          }
        }
      ]
    });

    await alert.present();
  }

  onTeamDropped(event: { fromIndex: number, toIndex: number }) {
    const teamsArray = [...this._teams.value];
  
    if (event.fromIndex !== event.toIndex) {
      // Remueve el equipo de su posición original
      const movedItem = teamsArray.splice(event.fromIndex, 1)[0];
  
      // Inserta el equipo en la nueva posición
      teamsArray.splice(event.toIndex, 0, movedItem);
  
      // Actualiza el BehaviorSubject con la nueva lista ordenada
      this._teams.next(teamsArray);
    }
  }
  
}


