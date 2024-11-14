import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MascotasModalEditPage } from '../mascotas-modal-edit/mascotas-modal-edit.page'; // Modal para editar mascota
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importamos AngularFireAuth
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importamos AngularFireDatabase para Realtime Database
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-publicacion-mascotas',
  templateUrl: './publicacion-mascotas.page.html',
  styleUrls: ['./publicacion-mascotas.page.scss'],
})
export class PublicacionMascotasPage {
  
  usuario: any = {};  // Información del usuario logueado
  misMascotas: any[] = [];  // Publicaciones del usuario como mascotas
  mostrarMascotas: boolean = true;

  constructor(private modalCtrl: ModalController, private afAuth: AngularFireAuth, private db: AngularFireDatabase, private storage: AngularFireStorage) {  }

  ionViewWillEnter() {
    this.verMisMascotas();  // Cargar automáticamente las mascotas
  }

  verMisMascotas() {
    // Obtenemos el UID del usuario logueado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;  // Aquí obtenemos el UID del usuario logueado

        // Accedemos al nodo de mascotas del usuario en Realtime Database
        this.db.list(`mascotas/${uid}`).snapshotChanges().subscribe(snapshot => {
          this.misMascotas = snapshot.map(action => {
            const data = action.payload.val() as object || {};  // Asegurarnos de que `data` es un objeto
            const mascotaId = action.key;  // Obtenemos el ID de la mascota
            return { ...data, uid, mascotaId };  // Devolvemos el objeto con uid y mascotaId
          });
        });
      } else {
        console.error('No se pudo obtener el UID del usuario.');
      }
    });
  }

  async editarMascota(mascota: any) {
    const modal = await this.modalCtrl.create({
      component: MascotasModalEditPage,
      componentProps: { mascota }
    });
    modal.onDidDismiss().then(() => this.verMisMascotas());
    return await modal.present();
  }

  eliminarMascota(mascota: any) {
    const uid = mascota.uid;  // UID del dueño de la mascota
    const mascotaId = mascota.mascotaId;  // Identificador único de la mascota
    const imagenUrl = mascota.imagenUrl;  // URL de la imagen, si existe
    
    // Verificar que ambos valores estén presentes
    if (!uid || !mascotaId) {
      alert('No se pudo eliminar la mascota. Faltan datos de identificación.');
      return;
    }
    
    if (confirm(`¿Estás seguro de eliminar la publicación de la mascota ${mascota.nombre}?`)) {
      // Si hay una imagen asociada, eliminarla de Firebase Storage primero
      if (imagenUrl) {
        const filePath = this.getFilePathFromUrl(imagenUrl);  // Extrae la ruta del archivo desde la URL
        this.storage.ref(filePath).delete().subscribe(() => {
          console.log(`Imagen de la mascota ${mascota.nombre} eliminada de Storage.`);
        }, error => {
          console.error('Error al eliminar la imagen de Firebase Storage:', error);
        });
      }
      
      // Luego, eliminar los datos de la mascota en Realtime Database
      this.db.object(`mascotas/${uid}/${mascotaId}`).remove()
        .then(() => {
          alert(`La publicación de la mascota ${mascota.nombre} ha sido eliminada.`);
          this.verMisMascotas();  // Actualiza la lista de mascotas
        })
        .catch((error) => {
          console.error('Error al eliminar la mascota:', error);
          alert('Ocurrió un error al intentar eliminar la mascota. Inténtalo de nuevo.');
        });
    }
  }
  
  // Método auxiliar para extraer el archivo de la URL
  getFilePathFromUrl(url: string): string {
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/sacatucan.appspot.com/o/';
    const decodedUrl = decodeURIComponent(url); // Decodificar la URL
    return decodedUrl.substring(baseUrl.length, decodedUrl.indexOf('?'));  // Obtener solo el path del archivo
  }
   
  
}