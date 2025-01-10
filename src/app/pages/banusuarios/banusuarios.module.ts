import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BanusuariosPageRoutingModule } from './banusuarios-routing.module';

import { BanusuariosPage } from './banusuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BanusuariosPageRoutingModule
  ],
  declarations: [BanusuariosPage]
})
export class BanusuariosPageModule {}
