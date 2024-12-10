import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Team } from 'src/app/core/models/teams.model';

@Component({
  selector: 'app-team-create-modal',
  templateUrl: './team-create-modal.component.html',
  styleUrls: ['./team-create-modal.component.scss'],
})
export class TeamCreateModalComponent  implements OnInit {
  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;


  @Input() set team(_team:Team){
    if(_team && _team.id)
      this.mode = 'edit';
    
    this.formGroup.controls['name'].setValue(_team.name);
    this.formGroup.controls['numberOfPlayers'].setValue(_team.numberOfPlayers)
    this.formGroup.controls['league'].setValue(_team.league)
  }

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform
  ) { 
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    this.formGroup = this.fb.group({
      name:['', [Validators.required, Validators.minLength(2)]],
      numberOfPlayers:[''  ,[Validators.pattern(/^\d+$/)]],
      league:['', [Validators.required]]
    });
  }
  

  ngOnInit() {}

  get name(){
    return this.formGroup.controls['name'];
  }
  
  get numberOfPlayers(){
    return this.formGroup.controls['numberOfPlayers']
  }

  get league(){
    return this.formGroup.controls['league']
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

