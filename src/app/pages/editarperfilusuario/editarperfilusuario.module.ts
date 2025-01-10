import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarperfilusuarioPageRoutingModule } from './editarperfilusuario-routing.module';

import { EditarperfilusuarioPage } from './editarperfilusuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarperfilusuarioPageRoutingModule
  ],
  declarations: [EditarperfilusuarioPage]
})
export class EditarperfilusuarioPageModule {}
