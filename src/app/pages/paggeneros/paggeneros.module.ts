import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaggenerosPageRoutingModule } from './paggeneros-routing.module';

import { PaggenerosPage } from './paggeneros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaggenerosPageRoutingModule
  ],
  declarations: [PaggenerosPage]
})
export class PaggenerosPageModule {}
