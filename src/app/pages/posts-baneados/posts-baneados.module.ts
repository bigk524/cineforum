import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsBaneadosPageRoutingModule } from './posts-baneados-routing.module';

import { PostsBaneadosPage } from './posts-baneados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsBaneadosPageRoutingModule
  ],
  declarations: [PostsBaneadosPage]
})
export class PostsBaneadosPageModule {}
