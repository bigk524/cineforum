import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarperfilusuarioPage } from './editarperfilusuario.page';

const routes: Routes = [
  {
    path: '',
    component: EditarperfilusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarperfilusuarioPageRoutingModule {}
