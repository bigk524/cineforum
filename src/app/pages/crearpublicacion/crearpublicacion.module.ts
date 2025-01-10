import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearpublicacionPageRoutingModule } from './crearpublicacion-routing.module';

import { CrearpublicacionPage } from './crearpublicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearpublicacionPageRoutingModule
  ],
  declarations: [CrearpublicacionPage]
})
export class CrearpublicacionPageModule {}
