import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-match-menu',
  templateUrl: './match-menu.component.html',
  styleUrls: ['./match-menu.component.scss'],
})
export class MatchMenuComponent  implements OnInit {
  @Input() partidoId!: string;
  constructor(private actionSheetCtrl: ActionSheetController) {}
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
    console.log('Ver alineaciones');
  }

  verEstadisticas() {
    console.log('Ver estadísticas');
  }

  compartirPartido() {
    console.log('Compartir partido');
  }
}
