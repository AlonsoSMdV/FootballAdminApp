import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerModalComponent } from './components/player-modal/player-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PlayerCreateModalComponent } from './components/player-create-modal/player-create-modal.component';
import { TeamCreateModalComponent } from './components/team-create-modal/team-create-modal.component';
import { TeamSelectableComponent } from './components/team-selectable/team-selectable.component';
import { LeagueCreateModalComponent } from './components/league-create-modal/league-create-modal.component';
import { LeagueSelectableComponent } from './components/league-selectable/league-selectable.component';
import { PositionSelectableComponent } from './components/position-selectable/position-selectable.component';
import { PictureSelectableComponent } from './components/picture-selectable/picture-selectable.component';
import { PasswordTogglePipe } from './pipes/password-toggle/password-toggle.pipe';
import { MatchCreateComponent } from './components/match-create/match-create.component'
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { TimeDirectiveDirective } from './directives/time-directive/time-directive.directive';
import { FilterByTeamDirective } from './directives/filterByTeams/filter-by-teams.directive';
import { HighLightDirective } from './directives/high-light-directive/high-light.directive';
import { DragDropDirective } from './directives/drag-and-drop/drag-drop.directive';
import { MatchMenuComponent } from './components/match-menu/match-menu.component';



@NgModule({
  declarations: [PlayerModalComponent, 
    PlayerCreateModalComponent, 
    TeamCreateModalComponent, 
    TeamSelectableComponent, 
    LeagueCreateModalComponent, 
    LeagueSelectableComponent, 
    PositionSelectableComponent,
    PictureSelectableComponent,
    PasswordTogglePipe,
    MatchCreateComponent,
    LanguageSelectorComponent,
    TimeDirectiveDirective,
    FilterByTeamDirective,
    HighLightDirective,
    DragDropDirective,
    MatchMenuComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    FormsModule,
  ],
  exports:[PlayerModalComponent,
    PlayerCreateModalComponent, 
    TeamCreateModalComponent, 
    TeamSelectableComponent, 
    LeagueCreateModalComponent, 
    LeagueSelectableComponent,
    PositionSelectableComponent,
    PictureSelectableComponent,
    PasswordTogglePipe,
    MatchCreateComponent,
    LanguageSelectorComponent,
    TimeDirectiveDirective,
    FilterByTeamDirective,
    HighLightDirective,
    DragDropDirective,
    MatchMenuComponent
  ]
})
export class SharedModule { }
