import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match } from 'src/app/core/models/matches.model';
import { Player } from 'src/app/core/models/players.model';
import { Team } from 'src/app/core/models/teams.model';
import { MatchService } from 'src/app/core/services/impl/match.service';
import { PlayerService } from 'src/app/core/services/impl/player.service';
import { TeamService } from 'src/app/core/services/impl/team.service';

@Component({
  selector: 'app-lineups',
  templateUrl: './lineups.page.html',
  styleUrls: ['./lineups.page.scss'],
})
export class LineupsPage implements OnInit {
  
  partidoId!: string;
  match!: Match | null; 
  localTeam!: Team | null;
  visitorTeam!: Team | null;;
  localPlayers: Player[] | null = [];
  visitorPlayers: Player[] | null = [];
  constructor(
    private route: ActivatedRoute,
    private matchSvc: MatchService,
    private teamSvc: TeamService,
    private playerSvc: PlayerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.partidoId = id;
        this.loadMatch();
      }
    });
  }

  loadMatch() {
    this.matchSvc.getById(this.partidoId).subscribe({
      next: (match) => {
        if (match) {
          this.match = match;
          this.loadTeamsAndPlayers();
        }
      },
      error: err => console.error('Error loading match:', err)
    });
  }

  loadTeamsAndPlayers() {
    if (this.match!.localTeamId) {
      this.teamSvc.getById(this.match!.localTeamId).subscribe({
        next: (team) => this.localTeam = team!,
        error: err => console.error('Error loading local team:', err)
      });
  
      this.playerSvc.getAll(-1, 100, { team: this.match!.localTeamId }).subscribe({
        next: (result) => this.localPlayers = (result as any).data || [],
        error: err => console.error('Error loading local players:', err)
      });
    }
  
    if (this.match!.visitorTeamId) {
      this.teamSvc.getById(this.match!.visitorTeamId).subscribe({
        next: (team) => this.visitorTeam = team!,
        error: err => console.error('Error loading visitor team:', err)
      });
  
      this.playerSvc.getAll(-1, 100, { team: this.match!.visitorTeamId }).subscribe({
        next: (result) => this.visitorPlayers = (result as any).data || [], // <- Cambié localPlayers por visitorPlayers
        error: err => console.error('Error loading visitor players:', err)
      });
    }
  }
}
