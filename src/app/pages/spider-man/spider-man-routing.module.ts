import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpiderManPage } from './spider-man.page';

const routes: Routes = [
  {
    path: '',
    component: SpiderManPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpiderManPageRoutingModule {}
