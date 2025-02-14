import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { League } from 'src/app/core/models/leagues.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { LEAGUE_COLLECTION_SUBSCRIPTION_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { LeagueService } from 'src/app/core/services/impl/league.service';
import { CollectionChange, ICollectionSubscription } from 'src/app/core/services/interfaces/collection-subscription.interface';
import { LanguageService } from 'src/app/core/services/language.service';
import { LeagueCreateModalComponent } from 'src/app/shared/components/league-create-modal/league-create-modal.component';

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.page.html',
  styleUrls: ['./leagues.page.scss'],
})
export class LeaguesPage implements OnInit {
  img: string|undefined = './../../../assets/img/imgCard2.jpg'
  currentLang:string
  _leagues: BehaviorSubject<League[]> = new BehaviorSubject<League[]>([]);
  leagues$: Observable<League[]> = this._leagues.asObservable();
  private loadedIds: Set<string> = new Set();

  constructor(
    private leagueSvc: LeagueService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private languageService: LanguageService,
    private mediaSvc: BaseMediaService,
    private platform: Platform,
    @Inject(LEAGUE_COLLECTION_SUBSCRIPTION_TOKEN)
    private leagueSubs: ICollectionSubscription<League>
  ) { 
    this.currentLang = this.languageService.getStoredLanguage();
  }

  ngOnInit() {
    this.getLeagues();

    this.leagueSubs.subscribe('leagues').subscribe((change:
      CollectionChange<League>) => {
          const currentLeague = [...this._leagues.value];

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

          this._leagues.next(currentLeague)
      });
  }


  selectedLeague: any = null
  page: number = 1;
  pageSize:number = 25;
  pages:number = 0;

  getLeagues(){
    this.page=1;
    this.leagueSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<League>)=>{
        // Actualizar el registro de IDs cargados
        response.data.forEach(league => this.loadedIds.add(league.id));
        this._leagues.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }
  
  getMoreLeagues(notify: HTMLIonInfiniteScrollElement | null = null){
    this.leagueSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response: Paginated<League>)=>{
        // Actualizar el registro de IDs cargados
        response.data.forEach(league => this.loadedIds.add(league.id));
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
    modal.onDidDismiss().then(async (response)=>{
      let newLeague : any = null
      if (response.data.picture) {
        const base64Response = await fetch(response.data.picture);
        const blob = await base64Response.blob();
        const uploadedBlob = await lastValueFrom(this.mediaSvc.upload(blob));
        const pictureUrl = uploadedBlob.map(url => url.toString())
        response.data.picture = pictureUrl
  
        newLeague = {
          name: response.data.name,
          picture: {
            url: pictureUrl[0],
            large: pictureUrl[0],
            medium: pictureUrl[0],
            small: pictureUrl[0],
            thumbnail: pictureUrl[0],
          }
        }
      }else{
        newLeague = {
          name: response.data.name
        }
      }
      switch (response.role) {
        case 'new':
          this.leagueSvc.add(newLeague).subscribe({
            next:res=>{
              this.getLeagues();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.leagueSvc.update(league!.id, newLeague).subscribe({
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
      header: await this.translate.get('LEAGUES.MESSAGES.DELETE_CONFIRM').toPromise(),
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
