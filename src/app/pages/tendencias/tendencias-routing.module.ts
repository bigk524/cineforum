import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendenciasPage } from './tendencias.page';

const routes: Routes = [
  {
    path: '',
    component: TendenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TendenciasPageRoutingModule {}
