import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Team } from 'src/app/core/models/teams.model';
import { TeamService } from 'src/app/core/services/impl/team.service';
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

  constructor(
    private teamSvc: TeamService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private languageService: LanguageService
  ) { 
    this.currentLang = this.languageService.getStoredLanguage();
  }

  ngOnInit() {
    this.getTeams();
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
        this._teams.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }
  
  getMoreTeams(notify: HTMLIonInfiniteScrollElement | null = null){
    this.teamSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response: Paginated<Team>)=>{
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
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.teamSvc.add(response.data).subscribe({
            next:res=>{
              this.getTeams();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.teamSvc.update(team!.id, response.data).subscribe({
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
}
