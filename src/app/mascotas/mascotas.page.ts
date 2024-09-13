import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PublicarMascotaModalPage } from '../publicar-mascota-modal/publicar-mascota-modal.page';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage {

  mascotas: any[] = [];

  constructor(private modalController: ModalController, private router: Router) { }

  ionViewWillEnter() {
    // Cargar las mascotas desde el localStorage
    this.mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');
  }

  // Abrir el modal para publicar una nueva mascota
  async abrirModalMascota() {
    const modal = await this.modalController.create({
      component: PublicarMascotaModalPage
    });

    // Al cerrar el modal, actualizar la lista de mascotas
    modal.onDidDismiss().then(() => {
      this.mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');
    });

    return await modal.present();
  }

  // Ver detalles de una mascota
  async verDetallesMascota(mascota: any) {
    const mascotaString = JSON.stringify(mascota);
    this.router.navigate(['/detalle-mascota'], { queryParams: { mascota: mascotaString } });
  }
}
