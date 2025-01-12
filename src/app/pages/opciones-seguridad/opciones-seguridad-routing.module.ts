import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesSeguridadPage } from './opciones-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesSeguridadPageRoutingModule {}
