import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Match } from 'src/app/core/models/matches.model';
import { Team } from 'src/app/core/models/teams.model';
import { MatchService } from 'src/app/core/services/impl/match.service';
import { TeamService } from 'src/app/core/services/impl/team.service';

interface MatchWithTeams extends Match {
  localTeam?: Team;
  visitorTeam?: Team;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
  matchId!: string;
  match!: MatchWithTeams;
  localTeam!: Team | null;
  visitorTeam!: Team | null;

  stats = [
    { name: 'Tiros', local: 18, visitor: 13 },
    { name: 'Tiros a puerta', local: 10, visitor: 3 },
    { name: 'Posesión', local: '61%', visitor: '39%' },
    { name: 'Pases', local: 545, visitor: 349 },
    { name: 'Precisión de pases', local: '88%', visitor: '82%' },
    { name: 'Faltas', local: 5, visitor: 12 },
    { name: 'Tarjetas amarillas', local: 0, visitor: 2 },
    { name: 'Tarjetas rojas', local: 0, visitor: 0 },
    { name: 'Fueras de juego', local: 1, visitor: 4 },
    { name: 'Saques de esquina', local: 4, visitor: 6 }
  ];

  constructor(
    private route: ActivatedRoute,
    private matchSvc: MatchService,
    private teamSvc: TeamService
  ) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get('id')!;

    this.matchSvc.getById(this.matchId).subscribe({
      next: async (match) => {
        try {
          const [localTeamRaw, visitorTeamRaw] = await Promise.all([
            match!.localTeamId ? firstValueFrom(this.teamSvc.getById(match!.localTeamId)) : undefined,
            match!.visitorTeamId ? firstValueFrom(this.teamSvc.getById(match!.visitorTeamId)) : undefined
          ]);

          // Asegurar que sean `undefined` si venían como `null`
          const localTeam = localTeamRaw ?? undefined;
          const visitorTeam = visitorTeamRaw ?? undefined;

          this.match = {
            ...(match as Match),
            localTeam,
            visitorTeam
          };

          // Llamamos a loadTeamsAndPlayers solo después de tener el partido cargado
          this.loadTeamsAndPlayers();
        } catch (error) {
          console.error('Error fetching team data:', error);
        }
      },
      error: (err) => {
        console.error('Error fetching match:', err);
      }
    });
  }

  loadTeamsAndPlayers() {
    // Verificar que `this.match` no es undefined antes de intentar acceder a sus propiedades
    if (this.match) {
      if (this.match.localTeamId) {
        this.teamSvc.getById(this.match.localTeamId).subscribe({
          next: (team) => this.localTeam = team!,
          error: err => console.error('Error loading local team:', err)
        });
      }
    
      if (this.match.visitorTeamId) {
        this.teamSvc.getById(this.match.visitorTeamId).subscribe({
          next: (team) => this.visitorTeam = team!,
          error: err => console.error('Error loading visitor team:', err)
        });
      }
    }
  }
}
