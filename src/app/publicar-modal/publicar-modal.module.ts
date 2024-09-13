import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa FormsModule y ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { PublicarModalPageRoutingModule } from './publicar-modal-routing.module';
import { PublicarModalPage } from './publicar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de añadir ReactiveFormsModule
    IonicModule,
    PublicarModalPageRoutingModule
  ],
  declarations: [PublicarModalPage]
})
export class PublicarModalPageModule {}
