import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfopeliPageRoutingModule } from './infopeli-routing.module';

import { InfopeliPage } from './infopeli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfopeliPageRoutingModule
  ],
  declarations: [InfopeliPage]
})
export class InfopeliPageModule {}
