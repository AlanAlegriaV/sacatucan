import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PublicarMascotaModalPage } from '../publicar-mascota-modal/publicar-mascota-modal.page';
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Importa AngularFireDatabase para Realtime Database

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})
export class MascotasPage {

  mascotas: any[] = [];
  

  constructor(private modalController: ModalController, private router: Router, private db: AngularFireDatabase) { }

  ionViewWillEnter() {
    // Cargar las mascotas desde Realtime Database
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.db.object('mascotas').snapshotChanges().subscribe(snapshot => {
      const mascotasCargadas: any[] = [];
  
      const allOwners = snapshot.payload.val() as { [key: string]: any };  // Aseguramos que es un objeto
  
      // Verificamos que allOwners no sea nulo y que sea un objeto
      if (allOwners && typeof allOwners === 'object') {
        // Recorrer todos los dueños
        for (const ownerId in allOwners) {
          if (allOwners.hasOwnProperty(ownerId)) {
            const ownerMascotas = allOwners[ownerId];
  
            // Recorrer todas las mascotas del dueño actual
            for (const mascotaId in ownerMascotas) {
              if (ownerMascotas.hasOwnProperty(mascotaId)) {
                const mascota = ownerMascotas[mascotaId];
                mascota.uid = ownerId;  // UID del dueño
                mascota.mascotaId = mascotaId;  // Agregar el ID de la mascota
                mascotasCargadas.push(mascota);  // Añadir la mascota a la lista
              }
            }
          }
        }
      }
  
      this.mascotas = mascotasCargadas;  // Asignar todas las mascotas cargadas al array de mascotas
    });
  }
  

  
  // Abrir el modal para publicar una nueva mascota
async abrirModalMascota() {
  const modal = await this.modalController.create({
    component: PublicarMascotaModalPage
  });

  // Al cerrar el modal, actualizar la lista de mascotas desde Firebase
  modal.onDidDismiss().then(() => {
    this.cargarMascotas();  // Llama a la función para cargar las mascotas desde Firebase
  });

  return await modal.present();
}


  // Ver detalles de una mascota
  async verDetallesMascota(mascota: any) {
    const mascotaString = JSON.stringify(mascota);
    this.router.navigate(['/detalle-mascota'], { queryParams: { mascota: mascotaString } });
  }
}
