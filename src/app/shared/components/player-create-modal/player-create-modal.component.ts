import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Player } from 'src/app/core/models/players.model';

@Component({
  selector: 'app-player-create-modal',
  templateUrl: './player-create-modal.component.html',
  styleUrls: ['./player-create-modal.component.scss'],
})
export class PlayerCreateModalComponent  implements OnInit {
  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;


  @Input() set player(_player:Player){
    if(_player && _player.id)
      this.mode = 'edit';
    
    this.formGroup.controls['name'].setValue(_player.name);
    this.formGroup.controls['firstSurname'].setValue(_player.firstSurname)
    this.formGroup.controls['secondSurname'].setValue(_player.secondSurname);
    this.formGroup.controls['nationality'].setValue(_player.nationality)
    this.formGroup.controls['dorsal'].setValue(_player.dorsal);
    this.formGroup.controls['birthdate'].setValue(_player.birthdate)
    this.formGroup.controls['position'].setValue(_player.position);
    this.formGroup.controls['team'].setValue(_player.team)
  }

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform
  ) { 
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    this.formGroup = this.fb.group({
      name:['', [Validators.required, Validators.minLength(2)]],
      firstSurname:['', [Validators.required, Validators.minLength(2)]],
      secondSurname:['', [Validators.required, Validators.minLength(2)]],
      nationality:['', [Validators.required, Validators.minLength(3)]],
      dorsal:['', [Validators.pattern(/^\d+$/)]],
      birthdate:['', [Validators.required]],
      position:['', [Validators.required, Validators.minLength(2)]],
      team:[null, [Validators.required]]
    });
  }
  

  ngOnInit() {}

  get name(){
    return this.formGroup.controls['name'];
  }

  get firstSurname(){
    return this.formGroup.controls['firstSurname']
  }

  get secondSurname(){
    return this.formGroup.controls['secondSurname']
  }

  get nationality(){
    return this.formGroup.controls['nationality']
  }

  get dorsal(){
    return this.formGroup.controls['dorsal']
  }

  get birthdate(){
    return this.formGroup.controls['birthdate']
  }

  get position(){
    return this.formGroup.controls['position']
  }

  get team(){
    return this.formGroup.controls['team']
  }
  
  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues: any = {};
  
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        dirtyValues[key] = control.value;
      }
    });
  
    return dirtyValues;
  }

  onSubmit(){
    if (this.formGroup.valid) {
      this.modalCtrl.dismiss(
          (this.mode=='new'?
            this.formGroup.value:
            this.getDirtyValues(this.formGroup)), this.mode
      );
    } else {
      console.log('Formulario inválido');
    }

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

