import { DatePipe } from '@angular/common';import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Player } from 'src/app/core/models/players.model';


@Component({
  selector: 'app-player-create-modal',
  templateUrl: './player-create-modal.component.html',
  styleUrls: ['./player-create-modal.component.scss'],
})
export class PlayerCreateModalComponent  implements OnInit {
  getBirthdate: FormControl;
  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;
  isDatePickerOpen = false;



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
    private platform: Platform,
    
  ) { 
    this.getBirthdate = new FormControl('');
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
  
  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  onDateChange(event: any) {
    const rawDate = new Date(event.detail.value); // Convierte el valor recibido a un objeto Date

  // Si prefieres 'dd-MM-yyyy'
  const formattedDate = `${rawDate.getDate().toString().padStart(2, '0')}-${(rawDate.getMonth() + 1).toString().padStart(2, '0')}-${rawDate.getFullYear()}`;

  this.birthdate.setValue(formattedDate); // Asigna el valor formateado al control de formulario
  this.isDatePickerOpen = false; // Cierra el modal del date picker
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

