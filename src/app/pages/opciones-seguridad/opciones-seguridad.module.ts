import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesSeguridadPageRoutingModule } from './opciones-seguridad-routing.module';

import { OpcionesSeguridadPage } from './opciones-seguridad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesSeguridadPageRoutingModule
  ],
  declarations: [OpcionesSeguridadPage]
})
export class OpcionesSeguridadPageModule {}
