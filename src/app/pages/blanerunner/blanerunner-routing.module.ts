import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlanerunnerPage } from './blanerunner.page';

const routes: Routes = [
  {
    path: '',
    component: BlanerunnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlanerunnerPageRoutingModule {}
