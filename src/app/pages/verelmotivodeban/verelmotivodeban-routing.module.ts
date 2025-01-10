import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerelmotivodebanPage } from './verelmotivodeban.page';

const routes: Routes = [
  {
    path: '',
    component: VerelmotivodebanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerelmotivodebanPageRoutingModule {}
