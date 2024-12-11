import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaguesPageRoutingModule } from './leagues-routing.module';

import { LeaguesPage } from './leagues.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaguesPageRoutingModule,
    TranslateModule.forChild()],
  declarations: [LeaguesPage]
})
export class LeaguesPageModule {}
