import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { Player } from 'src/app/core/models/players.model';

@Directive({
  selector: '[appFilterByTeam]'
})
export class FilterByTeamDirective implements OnChanges {
  @Input() selectedTeam: any = null; // Equipo seleccionado
  @Input() players: any[] = []; // Lista de jugadores

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    if (!this.players || this.players.length === 0) return;

    const selectedTeamId = this.selectedTeam ? this.selectedTeam.id : null;

    this.players.forEach((player) => {
      const element = this.el.nativeElement.querySelector(`[data-id="${player.id}"]`);

      if (element) {
        if (!selectedTeamId || player.team.id === selectedTeamId) {
          this.renderer.setStyle(element, 'display', 'block');
        } else {
          this.renderer.setStyle(element, 'display', 'none');
        }
      }
    });
  }
}