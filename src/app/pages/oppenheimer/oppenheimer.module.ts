import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OppenheimerPageRoutingModule } from './oppenheimer-routing.module';

import { OppenheimerPage } from './oppenheimer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OppenheimerPageRoutingModule
  ],
  declarations: [OppenheimerPage]
})
export class OppenheimerPageModule {}
