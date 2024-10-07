import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionPaseadorPageRoutingModule } from './publicacion-paseador-routing.module';

import { PublicacionPaseadorPage } from './publicacion-paseador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacionPaseadorPageRoutingModule
  ],
  declarations: [PublicacionPaseadorPage]
})
export class PublicacionPaseadorPageModule {}
