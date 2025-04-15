import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineupsPage } from './lineups.page';

const routes: Routes = [
  {
    path: '',
    component: LineupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LineupsPageRoutingModule {}
