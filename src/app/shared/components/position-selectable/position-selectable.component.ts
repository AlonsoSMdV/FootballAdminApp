import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-position-selectable',
  template: `
    <ion-select
      [placeholder]="'PLAYERS.SELECT_POSITION' | translate"
      [(ngModel)]="selectedPosition"
      (ionChange)="onChange($event)"
      interface="alert"
    >
      <ion-select-option value="Portero">{{ 'PLAYERS.POSITION_GOALKEEPER' | translate }}</ion-select-option>
      <ion-select-option value="Defensa">{{ 'PLAYERS.POSITION_DEFENDER' | translate }}</ion-select-option>
      <ion-select-option value="Mediocentro">{{ 'PLAYERS.POSITION_MIDFIELDER' | translate }}</ion-select-option>
      <ion-select-option value="Delantero">{{ 'PLAYERS.POSITION_FORWARD' | translate }}</ion-select-option>
    </ion-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PositionSelectableComponent),
      multi: true
    }
  ]
})
export class PositionSelectableComponent implements ControlValueAccessor, OnInit {
  @Input() placeholder: string = '';
  selectedPosition: string | null = null;
  private onChangeCallback: (_: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  constructor() {}

  ngOnInit() {}

  writeValue(value: string): void {
    if (value !== undefined) {
      this.selectedPosition = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  onChange(event: any): void {
    this.onChangeCallback(event.detail.value);
  }
}