import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Group } from 'src/app/core/models/group.model';
import { League } from 'src/app/core/models/leagues.model';

@Component({
  selector: 'app-league-create-modal',
  templateUrl: './league-create-modal.component.html',
  styleUrls: ['./league-create-modal.component.scss'],
})
export class LeagueCreateModalComponent  implements OnInit {
  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;


  @Input() set league(_league:League){
    if(_league && _league.id)
      this.mode = 'edit';
    
    this.formGroup.controls['name'].setValue(_league.name);
  }

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform
  ) { 
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    this.formGroup = this.fb.group({
      name:['', [Validators.required, Validators.minLength(2)]]
    });
  }
  

  ngOnInit() {}

  get name(){
    return this.formGroup.controls['name'];
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
