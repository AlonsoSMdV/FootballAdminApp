import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { Match } from 'src/app/core/models/matches.model';
import { MatchStatistics } from 'src/app/core/models/matchStatistics.model';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Team } from 'src/app/core/models/teams.model';
import { MatchService } from 'src/app/core/services/impl/match.service';
import { MatchStatsService } from 'src/app/core/services/impl/matchStats.service';
import { TeamService } from 'src/app/core/services/impl/team.service';
import { LanguageService } from 'src/app/core/services/language.service';

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
  localGoals!: string;
  visitorGoals!: string;
  localTeam!: Team | null;
  visitorTeam!: Team | null;
  generatedStats!: any;
  loadingStats = true;
  errorMessage: string | null = null;
  currentLang: string

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
    private teamSvc: TeamService,
    private statsSvc: MatchStatsService,
    private translate: TranslateService,
    private languageService: LanguageService) {
      this.currentLang = this.languageService.getStoredLanguage();
    }

  ngOnInit() {
    this.matchId = this.route.snapshot.paramMap.get('id')!;
    this.loadMatchData();
  }

  loadMatchData() {
    this.loadingStats = true;
    this.errorMessage = null;

    this.matchSvc.getById(this.matchId).subscribe({
      next: async (match) => {
        try {
          const [localTeamRaw, visitorTeamRaw] = await Promise.all([
            match!.localTeamId ? firstValueFrom(this.teamSvc.getById(match!.localTeamId)) : Promise.resolve(undefined),
            match!.visitorTeamId ? firstValueFrom(this.teamSvc.getById(match!.visitorTeamId)) : Promise.resolve(undefined)
          ]);

          // Asegurar que sean undefined si venían como null
          const localTeam = localTeamRaw ?? undefined;
          const visitorTeam = visitorTeamRaw ?? undefined;

          this.match = {
            ...(match as Match),
            localTeam,
            visitorTeam
          };
          
          if (typeof this.match.result === 'string' && this.match.result.includes('-')) {
            const [local, visitor] = this.match.result.split('-');
            this.localGoals = local?.trim();
            this.visitorGoals = visitor?.trim();
          } else {
            this.localGoals = '0';
            this.visitorGoals = '0';
          }
          
          this.loadTeams();
          this.generateStatsBasedOnStatus();
        } catch (error) {
          console.error('Error fetching team data:', error);
          this.errorMessage = 'Error al cargar los datos de los equipos.';
          this.loadingStats = false;
        }
      },
      error: (err) => {
        console.error('Error fetching match:', err);
        this.errorMessage = 'Error al cargar el partido.';
        this.loadingStats = false;
      }
    });
  }

  generateStatsBasedOnStatus() {
    if (!this.match || !this.match.status) {
      this.loadingStats = false;
      return;
    }
  
    const baseStats = this.stats.map(stat => ({
      name: stat.name,
      localValue: 0,
      visitorValue: 0,
    }));
  
    const statsId = this.generatedStats?.id || this.match.id + '_stats';
  
    if (this.match.status.toLowerCase() === 'finalizado') {
      // Verificamos si ya existen stats en Firebase
      this.statsSvc.getAll().subscribe({
        next: (allStatsResult: any[] | Paginated<any>) => {
          const statsArray = Array.isArray(allStatsResult)
            ? allStatsResult
            : allStatsResult.data ?? [];
      
          const existingStats = statsArray.find(s => s.matchId === this.match.id);
      
          if (existingStats) {
            this.generatedStats = existingStats;
          } else {
            const newStats: any = {
              matchId: this.match.id,
              userId: '', // Si es vacío, considera no incluirlo
              stats: this.stats.map(stat => ({
                name: stat.name,
                localValue: this.generateValue(stat.local),
                visitorValue: this.generateValue(stat.visitor),
              }))
            };
            
            // Si userId está vacío, elimínalo para que no cause problemas
            if (!newStats.userId) {
              delete newStats.userId;
            }
            
            // Validar que no haya propiedades con valores undefined
            Object.keys(newStats).forEach(key => {
              if (newStats[key] === undefined) {
                delete newStats[key];
              }
            });
      
            this.statsSvc.add(newStats).subscribe({
              next: () => {
                this.generatedStats = newStats;
              },
              error: (err) => {
                console.error('Error saving stats to Firebase:', err);
                this.errorMessage = 'Error al guardar las estadísticas en Firebase.';
              }
            });
          }
      
          this.loadingStats = false;
        },
        error: err => {
          console.error('Error loading stats from Firebase:', err);
          this.errorMessage = 'Error al cargar estadísticas desde Firebase.';
          this.loadingStats = false;
        }
      });
    } else if (this.match.status.toLowerCase() === 'por jugar') {
      // Partido no ha comenzado
      this.generatedStats = {
        id: statsId,
        matchId: this.match.id,
        userId: '',
        stats: baseStats
      };
      this.loadingStats = false;
    } else {
      // Jugando u otro estado, estadísticas generadas al vuelo
      this.generatedStats = {
        id: statsId,
        matchId: this.match.id,
        userId: '',
        stats: this.stats.map(stat => ({
          name: stat.name,
          localValue: this.generateValue(stat.local),
          visitorValue: this.generateValue(stat.visitor),
        }))
      };
      this.loadingStats = false;
    }
  }
  

  generateValue(baseValue: number | string): number | string {
    const base = typeof baseValue === 'string' && baseValue.includes('%')
      ? parseFloat(baseValue.replace('%', ''))
      : Number(baseValue);
  
    if (isNaN(base)) return 0;
  
    const variation = base * 0.3; // hasta un 30% de variación
    let randomValue = base + (Math.random() * variation - variation / 2);
  
    if (typeof baseValue === 'string' && baseValue.includes('%')) {
      return `${Math.max(0, Math.min(100, Number(randomValue.toFixed(0))))}%`;
    }
  
    return Math.max(0, Math.round(randomValue));
  }

  loadTeams() {
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

  isGreater(a: any, b: any): boolean {
    const valA = this.parseStatValue(a);
    const valB = this.parseStatValue(b);
    return valA > valB;
  }
  
  parseStatValue(value: any): number {
    if (typeof value === 'string' && value.includes('%')) {
      return parseFloat(value.replace('%', ''));
    }
    return typeof value === 'number' ? value : parseFloat(value) || 0;
  }
  
  // Método para refrescar los datos
  doRefresh(event: any) {
    this.loadMatchData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
