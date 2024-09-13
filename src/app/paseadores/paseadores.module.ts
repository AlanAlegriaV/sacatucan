import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaseadoresPageRoutingModule } from './paseadores-routing.module';

import { PaseadoresPage } from './paseadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaseadoresPageRoutingModule
  ],
  declarations: [PaseadoresPage]
})
export class PaseadoresPageModule {}
