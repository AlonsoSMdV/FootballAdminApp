import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Player } from 'src/app/core/models/players.model';
import { PlayerService } from 'src/app/core/services/impl/player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {

  _players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  players$: Observable<Player[]> = this._players.asObservable();

  constructor(
    private playerSvc: PlayerService
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

