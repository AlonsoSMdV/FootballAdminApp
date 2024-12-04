import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Team } from 'src/app/core/models/teams.model';
import { TeamService } from 'src/app/core/services/impl/team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  _teams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  teams$: Observable<Team[]> = this._teams.asObservable();

  constructor(
    private teamSvc: TeamService
  ) { }

  ngOnInit() {
    this.getTeams();
  }


  selectedLeague: any = null
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
}
