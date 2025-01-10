import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerelmotivodebanPageRoutingModule } from './verelmotivodeban-routing.module';

import { VerelmotivodebanPage } from './verelmotivodeban.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerelmotivodebanPageRoutingModule
  ],
  declarations: [VerelmotivodebanPage]
})
export class VerelmotivodebanPageModule {}
