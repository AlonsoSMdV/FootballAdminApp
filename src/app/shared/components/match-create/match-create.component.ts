import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { Match } from 'src/app/core/models/matches.model';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.scss'],
})
export class MatchCreateComponent  implements OnInit {
  getDay: FormControl;
  getHour: FormControl;
  formGroup:FormGroup;
  mode:'new'|'edit' = 'new';
  isMobile: boolean = false;
  isDatePickerOpen = false;
  isTimePickerOpen = false;
  isLocalTeamModalOpen = false;
  isVisitorTeamModalOpen = false;


  @Input() set match(_match:Match){
    if(_match && _match.id)
      this.mode = 'edit';
    
    this.formGroup.controls['day'].setValue(_match.day);
    this.formGroup.controls['hour'].setValue(_match.hour);
    this.formGroup.controls['result'].setValue(_match.result);
    this.formGroup.controls['place'].setValue(_match.place);
    this.formGroup.controls['localTeamId'].setValue(_match.localTeamId);
    this.formGroup.controls['visitorTeamId'].setValue(_match.visitorTeamId);

  }

  constructor(
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private platform: Platform
  ) { 
    this.getDay = new FormControl('');
    this.getHour = new FormControl('');
    this.isMobile = this.platform.is('ios') || this.platform.is('android');
    this.formGroup = this.fb.group({
      day:['', [Validators.required]],
      hour: ['', [Validators.required]],
      result:['', [Validators.required]],
      place: ['', [Validators.required]],
      localTeamId: ['', [Validators.required]],
      visitorTeamId: ['', [Validators.required]]
      
    });
  }

  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  openTimePicker() {
    this.isTimePickerOpen = true;
  }
  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/');
  }

  formatTime(time: string): string {
    return time.substring(11, 16);
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.formGroup.get('day')?.setValue(this.formatDate(selectedDate));
    this.isDatePickerOpen = false;
  }

  onTimeChange(event: any) {
    const selectedTime = event.detail.value;
    this.formGroup.get('hour')?.setValue(this.formatTime(selectedTime));
    this.isTimePickerOpen = false;
  }

  onLocalTeamMouseEnter() {
    this.isVisitorTeamModalOpen = false;
    this.isLocalTeamModalOpen = true;
  }

  onLocalTeamMouseLeave() {
    this.isLocalTeamModalOpen = false;
  }

  onVisitorTeamMouseEnter() {
    this.isLocalTeamModalOpen = false;
    this.isVisitorTeamModalOpen = true;
  }

  onVisitorTeamMouseLeave() {
    this.isVisitorTeamModalOpen = false;
  }

  ngOnInit() {}

  get day(){
    return this.formGroup.controls['day'];
  }

  get hour(){
    return this.formGroup.controls['hour'];
  }

  get result(){
    return this.formGroup.controls['result'];
  }

  get place(){
    return this.formGroup.controls['place'];
  }

  get localTeamId(){
    return this.formGroup.controls['localTeamId'];
  }

  get visitorTeamId(){
    return this.formGroup.controls['visitorTeamId'];
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
