import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Player } from 'src/app/core/models/players.model';
import { PlayerService } from 'src/app/core/services/impl/player.service';
import { PlayerModalComponent } from 'src/app/shared/components/player-modal/player-modal.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  _players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  players$: Observable<Player[]> = this._players.asObservable();

  constructor(
    private playerSvc: PlayerService,
    private modalCtrl: ModalController,
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
  
  getMoreLeagues(notify: HTMLIonInfiniteScrollElement | null = null){
    this.playerSvc.getAll(this.page, this.pageSize).subscribe({
      next:(response: Paginated<Player>)=>{
        this._players.next([...this._players.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    })
  }
}


