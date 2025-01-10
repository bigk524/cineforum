import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PelistendenciasPage } from './pelistendencias.page';

const routes: Routes = [
  {
    path: '',
    component: PelistendenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PelistendenciasPageRoutingModule {}
