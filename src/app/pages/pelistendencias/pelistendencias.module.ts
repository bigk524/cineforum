import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PelistendenciasPageRoutingModule } from './pelistendencias-routing.module';

import { PelistendenciasPage } from './pelistendencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PelistendenciasPageRoutingModule
  ],
  declarations: [PelistendenciasPage]
})
export class PelistendenciasPageModule {}
