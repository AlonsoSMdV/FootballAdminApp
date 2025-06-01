import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Player } from 'src/app/core/models/players.model';
import { Users } from 'src/app/core/models/users.model';
import { PLAYER_COLLECTION_SUBSCRIPTION_TOKEN } from 'src/app/core/repositories/repository.tokens';
import { BaseMediaService } from 'src/app/core/services/impl/base-media.service';
import { PlayerService } from 'src/app/core/services/impl/player.service';
import { UsersService } from 'src/app/core/services/impl/users.service';
import { CollectionChange, ICollectionSubscription } from 'src/app/core/services/interfaces/collection-subscription.interface';
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
  currentUserId!: string | undefined;
  currentUser: Users | null = null;
  @Input() teamId!:string
  flippedCards: { [key: string]: boolean } = {};
  private loadedIds: Set<string> = new Set();

  toggleFlip(playerId: string) {
    // Toggle only the clicked card without affecting others
    this.flippedCards[playerId] = !this.flippedCards[playerId];
  }

  constructor(
    private userSvc: UsersService,
    private route: ActivatedRoute,
    private playerSvc: PlayerService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private languageService: LanguageService,
    private mediaSvc: BaseMediaService,
    @Inject(PLAYER_COLLECTION_SUBSCRIPTION_TOKEN)
    private playerSubs: ICollectionSubscription<Player>
  ) { 
    this.currentLang = this.languageService.getStoredLanguage();
  }

  ngOnInit() {
    this.userSvc.getCurrentUser().subscribe(user => {
      this.currentUserId = user!!.userId;
      this.currentUser = user
    });

    this.route.paramMap.subscribe(params => {
      const teamId = params.get('id');
      if (teamId) {
        this.teamId = teamId;
        this.getPlayersByTeam();
      } else {
        this.getPlayers();
      }

    this.playerSubs.subscribe('players').subscribe((change:
          CollectionChange<Player>) => {
              const currentLeague = [...this._players.value];
    
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
    
              this._players.next(currentLeague)
          });
        });
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
        // Actualizar el registro de IDs cargados
        response.data.forEach(player => this.loadedIds.add(player.id));
        this._players.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }
  
  getMorePlayers(notify: HTMLIonInfiniteScrollElement | null = null){
    this.playerSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response: Paginated<Player>)=>{
        // Actualizar el registro de IDs cargados
        response.data.forEach(player => this.loadedIds.add(player.id));
        this._players.next([...this._players.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

  getPlayersByTeam(){
    this.page=1;
    this.playerSvc.getPlayersByTeam(this.teamId, this.page, this.pageSize).subscribe({
      next:(response:Paginated<Player>)=>{
        // Actualizar el registro de IDs cargados
        response.data.forEach(player => this.loadedIds.add(player.id));
        this._players.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }
  
  getMorePlayersByTeam(notify: HTMLIonInfiniteScrollElement | null = null){
    this.playerSvc.getPlayersByTeam(this.teamId, this.page, this.pageSize).subscribe({
      next:(response: Paginated<Player>)=>{
        // Actualizar el registro de IDs cargados
        response.data.forEach(player => this.loadedIds.add(player.id));
        this._players.next([...this._players.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }

  async setFavoritePlayer(playerId: string | null) {
        try {
          
          const updatedUser: any = {
            ...this.currentUser,
            playerFav: playerId ? playerId : undefined  // 👈 Aquí está el truco
          };
      
          await firstValueFrom(this.userSvc.update(this.currentUser!!.id, updatedUser));
          this.userSvc.getCurrentUser().subscribe(user => {
            this.currentUserId = user!!.userId;
            this.currentUser = user
          });
          console.log('Favorite player updated:', playerId);
        } catch (err) {
          console.error('Error setting favorite player:', err);
        }
      }
      
      toggleFavorite(player: Player) {
        const isFavorite = this.currentUser?.playerFav === player.id;
        const newPlayerFav = isFavorite ? null : player.id;
      
        this.setFavoritePlayer(newPlayerFav);
      }
  
  async openPlayerDetail(player: Player){
    const modal = await this.modalCtrl.create({
      component: PlayerModalComponent,
      componentProps: {player},
    });
    await modal.present();
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
          const user = await firstValueFrom(this.userSvc.getCurrentUser());
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
          },
          userId: user!!.userId
          
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
          team: response.data.team,
          userId: user!!.userId,

        }
      }
      switch (response.role) {
        case 'new':
          this.playerSvc.add(newPlayer).subscribe({
            next:res=>{
              this.teamId ? this.getPlayersByTeam() : this.getPlayers();
            },
            error:err=>{}
          });
          break;
        case 'edit':
          this.playerSvc.update(player!.id, newPlayer).subscribe({
            next:res=>{
              this.teamId ? this.getPlayersByTeam() : this.getPlayers();
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
                this.teamId ? this.getPlayersByTeam() : this.getPlayers();
              },
              error: err => {}
            });
          }
        }
      ]
    });

    await alert.present();
  }

  onPlayerDropped(event: { fromIndex: number, toIndex: number }) {
    const playersArray = [...this._players.value];
  
    if (event.fromIndex !== event.toIndex) {
      // Remueve el equipo de su posición original
      const movedItem = playersArray.splice(event.fromIndex, 1)[0];
  
      // Inserta el equipo en la nueva posición
      playersArray.splice(event.toIndex, 0, movedItem);
  
      // Actualiza el BehaviorSubject con la nueva lista ordenada
      this._players.next(playersArray);
    }
  }
}


