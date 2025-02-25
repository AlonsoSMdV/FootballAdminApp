import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appTimeDirective]'
})
export class TimeDirectiveDirective implements OnChanges {
  @Input() matchTime: string | undefined; // Recibe la hora en formato HH:mm
  @Input() matchDate: string | undefined; // Recibe la fecha opcionalmente (YYYY-MM-DD)

  constructor(private el: ElementRef, private translateService: TranslateService) {}

  ngOnChanges(): void {
    this.updateTimeFormat();
  }

  private updateTimeFormat(): void {
    if (!this.matchTime) return;
    
    const currentLang = this.translateService.currentLang || 'en';
    const [hours, minutes] = this.matchTime.split(':').map(Number);
    const date = this.matchDate ? new Date(`${this.matchDate}T${this.matchTime}:00`) : new Date();
    date.setHours(hours, minutes);
    
    const formattedTime = new Intl.DateTimeFormat(currentLang, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
    
    this.el.nativeElement.innerText = formattedTime;
  }
}
