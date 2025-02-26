import { Component, Inject, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Team } from 'src/app/core/models/teams.model';
import { TEAM_COLLECTION_SUBSCRIPTION_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { TeamService } from 'src/app/core/services/impl/team.service';
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
  private loadedIds: Set<string> = new Set();

  constructor(
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
    this.getTeams();

    this.TeamSubs.subscribe('teams').subscribe((change:
          CollectionChange<Team>) => {
              const currentLeague = [...this._teams.value];
    
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
    
              this._teams.next(currentLeague)
          });
  }


  selectedLeague: any = null
  selectedTeam: any = null
  page: number = 1;
  pageSize:number = 25;
  pages:number = 0;

  getTeams(){
    this.page=1;
    this.teamSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Team>)=>{
        // Actualizar el registro de IDs cargados
        response.data.forEach(team => this.loadedIds.add(team.id));
        this._teams.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }
  
  getMoreTeams(notify: HTMLIonInfiniteScrollElement | null = null){
    this.teamSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response: Paginated<Team>)=>{
        // Actualizar el registro de IDs cargados
        response.data.forEach(team => this.loadedIds.add(team.id));
        this._teams.next([...this._teams.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
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
              picture: {
                url: pictureUrl[0],
                large: pictureUrl[0],
                medium: pictureUrl[0],
                small: pictureUrl[0],
                thumbnail: pictureUrl[0],
              }
            }
          }else{
            newTeam = {
              name: response.data.name,
              numberOfPlayers: response.data.numberOfPlayers
            }
          }
      switch (response.role) {
        case 'new':
          this.teamSvc.add(newTeam).subscribe({
            next:res=>{
              this.getTeams();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.teamSvc.update(team!.id, newTeam).subscribe({
            next:res=>{
              this.getTeams();
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
                this.getTeams();
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


