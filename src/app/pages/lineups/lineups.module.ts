import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineupsPageRoutingModule } from './lineups-routing.module';

import { LineupsPage } from './lineups.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineupsPageRoutingModule,
    TranslateModule.forChild()],
  declarations: [LineupsPage]
})
export class LineupsPageModule {}
