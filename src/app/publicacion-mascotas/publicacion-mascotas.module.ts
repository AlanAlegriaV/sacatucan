import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionMascotasPageRoutingModule } from './publicacion-mascotas-routing.module';

import { PublicacionMascotasPage } from './publicacion-mascotas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicacionMascotasPageRoutingModule
  ],
  declarations: [PublicacionMascotasPage]
})
export class PublicacionMascotasPageModule {}
