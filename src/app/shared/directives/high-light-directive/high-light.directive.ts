import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighLightDirective {
  @Input('appHighlight') highlightColor: string = 'rgba(173, 216, 230, 0.3)'; // Color de fondo sutil (transparente)
  private defaultBoxShadow: string = '';
  private defaultBackgroundColor: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Guardamos el color de fondo original si existe
    this.defaultBackgroundColor = this.el.nativeElement.style.backgroundColor || 'rgba(255, 255, 255, 0.1)';
    this.defaultBoxShadow = this.el.nativeElement.style.boxShadow || 'none';
  }

  @HostListener('mouseenter') onMouseEnter() {
    // Solo resaltar el fondo si no estamos arrastrando algo
    if (!this.el.nativeElement.classList.contains('dragging')) {
      this.setBackgroundColor(this.highlightColor); // Fondo sutil al pasar el mouse
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    // Restaurar el color de fondo original
    this.setBackgroundColor(this.defaultBackgroundColor);
  }
  @HostListener('drop') onDrop() {
    // Al soltar, también eliminamos el borde
    this.setBorderColor('rgba(173, 216, 230, 0.3)');
  }

  private setBackgroundColor(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  private setBorderColor(style: string) {
    this.renderer.setStyle(this.el.nativeElement, 'border', style);
  }
}
