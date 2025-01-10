import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeletepublicacionesPageRoutingModule } from './deletepublicaciones-routing.module';

import { DeletepublicacionesPage } from './deletepublicaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeletepublicacionesPageRoutingModule
  ],
  declarations: [DeletepublicacionesPage]
})
export class DeletepublicacionesPageModule {}
