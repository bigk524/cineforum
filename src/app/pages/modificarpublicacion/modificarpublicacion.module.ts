import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarpublicacionPageRoutingModule } from './modificarpublicacion-routing.module';

import { ModificarpublicacionPage } from './modificarpublicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarpublicacionPageRoutingModule
  ],
  declarations: [ModificarpublicacionPage]
})
export class ModificarpublicacionPageModule {}
