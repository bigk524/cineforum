import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForopeliPage } from './foropeli.page';

const routes: Routes = [
  {
    path: '',
    component: ForopeliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForopeliPageRoutingModule {}
