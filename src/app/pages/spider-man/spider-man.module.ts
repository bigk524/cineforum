import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpiderManPageRoutingModule } from './spider-man-routing.module';

import { SpiderManPage } from './spider-man.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpiderManPageRoutingModule
  ],
  declarations: [SpiderManPage]
})
export class SpiderManPageModule {}
