import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { MatchService } from 'src/app/core/services/impl/match.service';
import { TeamService } from 'src/app/core/services/impl/team.service';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';
import { Match } from 'src/app/core/models/matches.model';
import { Team } from 'src/app/core/models/teams.model';

interface MatchWithTeams extends Match {
  localTeam?: Team;
  visitorTeam?: Team;
}

@Component({
  selector: 'app-match-menu',
  templateUrl: './match-menu.component.html',
  styleUrls: ['./match-menu.component.scss'],
})
export class MatchMenuComponent  implements OnInit {
  @Input() partidoId!: string;
  @Input() match!: MatchWithTeams;
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private matchSvc: MatchService,
    private teamSvc: TeamService,
    private translate: TranslateService,
    private alertCtrl: AlertController
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Ver Alineaciones',
          icon: 'people-outline',
          handler: () => {
            this.verAlineaciones();
          }
        },
        {
          text: 'Ver Estadísticas',
          icon: 'stats-chart-outline',
          handler: () => {
            this.verEstadisticas();
          }
        },
        {
          text: 'Compartir Partido', // recomendación 😉
          icon: 'share-social-outline',
          handler: () => {
            this.compartirPartido();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  verAlineaciones() {
    // Aquí defines cómo mostrarlo, ejemplo: cambiar a otro componente, mostrar modal, etc.
    this.router.navigate(['/lineups', this.partidoId])
    console.log(this.partidoId!)
  }

  verEstadisticas() {
    this.router.navigate(['/statistics', this.partidoId])
    console.log(this.partidoId)
  }

  async compartirPartido() {
    if (!this.match) return;
  
    const localTeamName = this.match.localTeam?.name || 'Equipo Local';
    const visitorTeamName = this.match.visitorTeam?.name || 'Equipo Visitante';
    const matchDay = this.match.day ? new Date(this.match.day).toLocaleDateString() : 'Fecha por confirmar';
    const matchHour = this.match.hour ? new Date(`2000-01-01T${this.match.hour}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Hora por confirmar';
    const matchPlace = this.match.place || 'Lugar por confirmar';
    const matchResult = this.match.result || 'Resultado pendiente';
  
    const shareText = `${localTeamName} vs ${visitorTeamName}\n` +
      `${this.translate.instant('MATCH.DATE')}: ${matchDay}\n` +
      `${this.translate.instant('MATCH.TIME')}: ${matchHour}\n` +
      `${this.translate.instant('MATCH.PLACE')}: ${matchPlace}\n` +
      `${this.translate.instant('MATCH.RESULT')}: ${matchResult}`;
  
    try {
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title: `${localTeamName} vs ${visitorTeamName}`,
          text: shareText,
          dialogTitle: this.translate.instant('MATCH.SHARE_DIALOG_TITLE')
        });
      } else if (navigator.share) {
        await navigator.share({
          title: `${localTeamName} vs ${visitorTeamName}`,
          text: shareText,
          url: 'matches'
        });
      } else {
        alert(shareText);
      }
    } catch (error) {
      console.error('Error al compartir:', error);
    }
  }
}
