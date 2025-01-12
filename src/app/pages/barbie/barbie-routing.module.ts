import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarbiePage } from './barbie.page';

const routes: Routes = [
  {
    path: '',
    component: BarbiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbiePageRoutingModule {}
