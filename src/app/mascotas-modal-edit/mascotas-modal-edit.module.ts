import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { MascotasModalEditPageRoutingModule } from './mascotas-modal-edit-routing.module';
import { MascotasModalEditPage } from './mascotas-modal-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de que ReactiveFormsModule esté aquí
    IonicModule,
    MascotasModalEditPageRoutingModule
  ],
  declarations: [MascotasModalEditPage]
})
export class MascotasModalEditPageModule {}
