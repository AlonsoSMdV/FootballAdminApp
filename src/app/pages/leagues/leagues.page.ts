import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { League } from 'src/app/core/models/leagues.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { LeagueService } from 'src/app/core/services/impl/league.service';
import { LeagueCreateModalComponent } from 'src/app/shared/components/league-create-modal/league-create-modal.component';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.page.html',
  styleUrls: ['./leagues.page.scss'],
})
export class LeaguesPage implements OnInit {

  _leagues: BehaviorSubject<League[]> = new BehaviorSubject<League[]>([]);
  leagues$: Observable<League[]> = this._leagues.asObservable();

  constructor(
    private leagueSvc: LeagueService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.getLeagues();
  }


  selectedLeague: any = null
  page: number = 1;
  pageSize:number = 25;
  pages:number = 0;

  getLeagues(){
    this.page=1;
    this.leagueSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<League>)=>{
        this._leagues.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }
  
  getMoreLeagues(notify: HTMLIonInfiniteScrollElement | null = null){
    this.leagueSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response: Paginated<League>)=>{
        this._leagues.next([...this._leagues.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

  async openLeague(league: any, index: number){
    await this.presentModalLeague('edit', league)
    this.selectedLeague
  }

  private async presentModalLeague(mode:'new'|'edit', league:League|undefined=undefined){
    const modal = await this.modalCtrl.create({
      component:LeagueCreateModalComponent,
      componentProps:(mode=='edit'?{
        league: league
      }:{})
    });
    modal.onDidDismiss().then((response:any)=>{
      switch (response.role) {
        case 'new':
          this.leagueSvc.add(response.data).subscribe({
            next:res=>{
              this.getLeagues();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.leagueSvc.update(league!.id, response.data).subscribe({
            next:res=>{
              this.getLeagues();
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

  async onAddLeague(){
    await this.presentModalLeague('new');
  }

  async onDeleteLeague(league: League) {
    const alert = await this.alertCtrl.create({
      header: await this.translate.get('PEOPLE.MESSAGES.DELETE_CONFIRM').toPromise(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'yes',
          handler: () => {
            this.leagueSvc.delete(league.id).subscribe({
              next: response => {
                this.getLeagues();
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
