import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TendenciasPageRoutingModule } from './tendencias-routing.module';

import { TendenciasPage } from './tendencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TendenciasPageRoutingModule
  ],
  declarations: [TendenciasPage]
})
export class TendenciasPageModule {}
