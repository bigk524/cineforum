import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpcionesPerfilPageRoutingModule } from './opciones-perfil-routing.module';

import { OpcionesPerfilPage } from './opciones-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpcionesPerfilPageRoutingModule
  ],
  declarations: [OpcionesPerfilPage]
})
export class OpcionesPerfilPageModule {}
