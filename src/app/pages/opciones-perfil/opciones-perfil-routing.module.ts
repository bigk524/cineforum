import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesPerfilPage } from './opciones-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: OpcionesPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OpcionesPerfilPageRoutingModule {}
