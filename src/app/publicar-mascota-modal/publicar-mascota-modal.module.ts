import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PublicarMascotaModalPage } from './publicar-mascota-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  declarations: [PublicarMascotaModalPage],
  exports: [PublicarMascotaModalPage] // Asegúrate de exportar el componente
})
export class PublicarMascotaModalPageModule {}
