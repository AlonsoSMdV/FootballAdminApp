import { Directive, ElementRef, Inject, Input, LOCALE_ID, OnChanges } from '@angular/core';
import { formatDate } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appFormatDate]' // Debe coincidir con lo que usas en el HTML
})

export class TimeDirectiveDirective implements OnChanges {
  @Input('appFormatDate') date!: string; // Recibe la fecha
  @Input() format: string = 'fullDate'; // Formato por defecto

  constructor(private el: ElementRef, @Inject(LOCALE_ID) private locale: string) {}

  ngOnChanges() {
    if (this.date) {
      try {
        // For debugging
        console.log('Input date:', this.date, 'Format:', this.format);
        
        // If it's just a time string, create a full date
        let dateValue = this.date;
        if (/^\d{1,2}:\d{1,2}(:\d{1,2})?$/.test(this.date)) {
          const today = new Date();
          dateValue = `${today.toISOString().split('T')[0]}T${this.date}`;
        }
        
        this.el.nativeElement.innerText = formatDate(dateValue, this.format, this.locale);
      } catch (error) {
        console.error('Error formatting date:', error, 'Input was:', this.date);
        // Fallback behavior - display original value
        this.el.nativeElement.innerText = this.date;
      }
    }
  }
}
