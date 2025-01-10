import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaggenerosPage } from './paggeneros.page';

const routes: Routes = [
  {
    path: '',
    component: PaggenerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaggenerosPageRoutingModule {}
