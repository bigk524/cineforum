import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletepublicacionesPage } from './deletepublicaciones.page';

const routes: Routes = [
  {
    path: '',
    component: DeletepublicacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeletepublicacionesPageRoutingModule {}
