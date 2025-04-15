import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LineupsPageRoutingModule } from './lineups-routing.module';

import { LineupsPage } from './lineups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LineupsPageRoutingModule
  ],
  declarations: [LineupsPage]
})
export class LineupsPageModule {}
