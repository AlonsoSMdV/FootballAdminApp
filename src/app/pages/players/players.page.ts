import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Player } from 'src/app/core/models/players.model';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { PlayerService } from 'src/app/core/services/impl/player.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { PlayerCreateModalComponent } from 'src/app/shared/components/player-create-modal/player-create-modal.component';
import { PlayerModalComponent } from 'src/app/shared/components/player-modal/player-modal.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  img: string|undefined = './../../../assets/img/imgCard2.jpg'
  currentLang:string
  _players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  players$: Observable<Player[]> = this._players.asObservable();
  flippedCards: { [key: string]: boolean } = {};

  toggleFlip(playerId: string) {
    // Toggle only the clicked card without affecting others
    this.flippedCards[playerId] = !this.flippedCards[playerId];
  }

  constructor(
    private playerSvc: PlayerService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private languageService: LanguageService,
    private mediaSvc: BaseMediaService
  ) { 
    this.currentLang = this.languageService.getStoredLanguage();
  }

  ngOnInit() {
    this.getPlayers();
  }


  selectedLeague: any = null
  selectedPlayer: any = null
  page: number = 1;
  pageSize:number = 25;
  pages:number = 0;

  getPlayers(){
    this.page=1;
    this.playerSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Player>)=>{
        this._players.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }

  async openPlayerDetail(player: Player){
    const modal = await this.modalCtrl.create({
      component: PlayerModalComponent,
      componentProps: {player},
    });
    await modal.present();
  }
  
  getMorePlayers(notify: HTMLIonInfiniteScrollElement | null = null){
    this.playerSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response: Paginated<Player>)=>{
        this._players.next([...this._players.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

  async openPlayer(player: any, index: number){
    await this.presentModalPLayer('edit', player)
    this.selectedPlayer
  }

  private async presentModalPLayer(mode:'new'|'edit', player:Player|undefined=undefined){
    const modal = await this.modalCtrl.create({
      component:PlayerCreateModalComponent,
      componentProps:(mode=='edit'?{
        player: player
      }:{})
    });
    modal.onDidDismiss().then(async (response)=>{
      let newPlayer : any = null
      if (response.data.picture) {
        const base64Response = await fetch(response.data.picture);
        const blob = await base64Response.blob();
        const uploadedBlob = await lastValueFrom(this.mediaSvc.upload(blob));
        const pictureUrl = uploadedBlob.map(url => url.toString())
        response.data.picture = pictureUrl
  
        newPlayer = {
          name: response.data.name,
          firstSurname: response.data.firstSurname,
          secondSurname: response.data.secondSurname,
          birthdate: response.data.birthdate,
          nationality: response.data.nationality,
          dorsal: response.data.dorsal,
          position: response.data.position,
          team: response.data.team,
          picture: {
            url: pictureUrl[0],
            large: pictureUrl[0],
            medium: pictureUrl[0],
            small: pictureUrl[0],
            thumbnail: pictureUrl[0],
          }
        }
      }else{
        newPlayer = {
          name: response.data.name,
          firstSurname: response.data.firstSurname,
          secondSurname: response.data.secondSurname,
          birthdate: response.data.birthdate,
          nationality: response.data.nationality,
          dorsal: response.data.dorsal,
          position: response.data.position,
          team: response.data.team

        }
      }
      switch (response.role) {
        case 'new':
          this.playerSvc.add(newPlayer).subscribe({
            next:res=>{
              this.getPlayers();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.playerSvc.update(player!.id, newPlayer).subscribe({
            next:res=>{
              this.getPlayers();
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

  async onAddPlayer(){
    await this.presentModalPLayer('new');
  }

  async onDeletePlayer(player: Player) {
    const alert = await this.alertCtrl.create({
      header: await this.translate.get('PLAYERS.MESSAGES.DELETE_CONFIRM').toPromise(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'yes',
          handler: () => {
            this.playerSvc.delete(player.id).subscribe({
              next: response => {
                this.getPlayers();
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


