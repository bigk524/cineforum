import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarpublicacionPage } from './modificarpublicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarpublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarpublicacionPageRoutingModule {}
