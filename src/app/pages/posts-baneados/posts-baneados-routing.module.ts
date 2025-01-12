import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsBaneadosPage } from './posts-baneados.page';

const routes: Routes = [
  {
    path: '',
    component: PostsBaneadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsBaneadosPageRoutingModule {}
