import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {
  @Input() dragData: any;
  @Input() index!: number; // Índice del elemento en la lista
  @Output() dropped = new EventEmitter<{ fromIndex: number, toIndex: number }>();

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text', JSON.stringify({ dragData: this.dragData, fromIndex: this.index }));
    this.el.nativeElement.style.opacity = '0.5';
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent) {
    this.el.nativeElement.style.opacity = '1';
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.style.border = '2px dashed #4CAF50'; // Resalta el área donde se puede soltar
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    this.el.nativeElement.style.border = 'none';
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.el.nativeElement.style.border = 'none';

    const data = event.dataTransfer?.getData('text');
    if (data) {
      const { fromIndex } = JSON.parse(data);
      const toIndex = this.index;

      if (fromIndex !== toIndex) {
        this.dropped.emit({ fromIndex, toIndex });
      }
    }
  }
}
