import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarbiePageRoutingModule } from './barbie-routing.module';

import { BarbiePage } from './barbie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarbiePageRoutingModule
  ],
  declarations: [BarbiePage]
})
export class BarbiePageModule {}
