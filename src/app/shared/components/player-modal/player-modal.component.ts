import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/core/models/players.model';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.scss'],
})
export class PlayerModalComponent  implements OnInit {
  img: string|undefined = './../../../assets/img/Player1.jpg'
  constructor(private modalCtrl: ModalController) { }

  @Input() player!: Player;

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss()

  }
}
