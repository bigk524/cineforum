import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForopeliPageRoutingModule } from './foropeli-routing.module';

import { ForopeliPage } from './foropeli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForopeliPageRoutingModule
  ],
  declarations: [ForopeliPage]
})
export class ForopeliPageModule {}
