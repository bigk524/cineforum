import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BlanerunnerPageRoutingModule } from './blanerunner-routing.module';

import { BlanerunnerPage } from './blanerunner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BlanerunnerPageRoutingModule
  ],
  declarations: [BlanerunnerPage]
})
export class BlanerunnerPageModule {}
