import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PublicarModalPage } from '../publicar-modal/publicar-modal.page'; // Modal para editar paseador
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-publicacion-paseador',
  templateUrl: './publicacion-paseador.page.html',
  styleUrls: ['./publicacion-paseador.page.scss'],
})
export class PublicacionPaseadorPage {
  usuario: any = {};  // Información del usuario logueado
  misPaseadores: any[] = [];  // Publicaciones del usuario como paseador
  mostrarPaseadores: boolean = true;

  constructor(private modalCtrl: ModalController, private afAuth: AngularFireAuth, private db: AngularFireDatabase,  private storage: AngularFireStorage ) { }

  ionViewWillEnter() {
    this.cargarDatosUsuario();  // Cargar datos del usuario al entrar en la vista
    this.verMisPaseadores();    // Cargar automáticamente la publicación de paseador
  }

  loadPaseadorData() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        const uid = user.uid;
  
        // Cargamos nuevamente los paseadores desde la Realtime Database
        this.db.list(`paseadores/${uid}`).valueChanges().subscribe((paseadores: any[]) => {
          this.misPaseadores = paseadores; // Actualizamos la lista de paseadores
          console.log('Publicaciones de paseadores actualizadas:', this.misPaseadores);
        });
      } 
    });
  }  

  // Método para cargar los datos del usuario logueado desde Firebase Realtime Database
  cargarDatosUsuario() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;  // Obtener el UID del usuario logueado

        // Acceder al nodo 'usuarios' en Realtime Database para obtener los datos
        this.db.object(`usuarios/${uid}`).valueChanges().subscribe((usuarioLogueado: any) => {
          if (usuarioLogueado) {
            this.usuario = {
              nombre: usuarioLogueado.nombre,
              apellido: usuarioLogueado.apellido,
              correo: usuarioLogueado.correo,
              telefono: usuarioLogueado.telefono,
              region: usuarioLogueado.region,
              comuna: usuarioLogueado.comuna
            };
          } else {
            console.error('No se encontraron datos para el usuario logueado en el nodo "usuarios".');
          }
        }, error => {
          console.error('Error al obtener los datos del usuario desde Firebase:', error);
        });
      } 
    });
  }

  verMisPaseadores() {
    // Obtener el usuario autenticado desde Firebase Auth
    this.afAuth.currentUser.then(user => {
      if (user) {
        // Obtener el UID del usuario logueado
        const uid = user.uid;
  
        // Acceder directamente al nodo del paseador con el UID del usuario
        this.db.list(`paseadores/${uid}`).valueChanges().subscribe((paseadores: any[]) => {
          // Verificar si hay datos
          if (paseadores && paseadores.length > 0) {
            this.misPaseadores = paseadores;
            console.log('Mis paseadores:', this.misPaseadores);  // Mostrar los paseadores en la consola
          } else {
            console.log('No se encontró ninguna publicación de paseador para este usuario.');
          }
        }, error => {
          console.error('Error al obtener los paseadores:', error);
        });
      }
    })
  }

  async editarPaseador(paseador: any) {
    const modal = await this.modalCtrl.create({
      component: PublicarModalPage,
      componentProps: { paseador }
    });
    modal.onDidDismiss().then(() => this.verMisPaseadores());
    return await modal.present();
  }

  eliminarPaseador() {
    if (confirm('¿Estás seguro de eliminar tu publicación como paseador?')) {
      // Obtener el usuario autenticado desde Firebase Auth
      this.afAuth.currentUser.then(user => {
        if (user) {
          const uid = user.uid;
          console.log('UID del usuario logueado:', uid);
  
          // Obtener los datos del paseador desde Firebase Realtime Database
          this.db.object(`paseadores/${uid}`).valueChanges().subscribe((paseadores: any) => {
            console.log('Datos del paseador recuperados:', paseadores);
  
            // Verificar si hay paseadores asociados al UID del usuario
            if (paseadores) {
              // Iterar sobre los paseadores para encontrar la imagen
              const paseadorId = Object.keys(paseadores)[0]; // Obtenemos el primer ID de paseador (o puedes mejorar la lógica si hay múltiples paseadores)
              const paseador = paseadores[paseadorId];
  
              if (paseador && paseador.imagen) {
                const filePath = this.getFilePathFromUrl(paseador.imagen);
                console.log('Ruta del archivo extraída:', filePath);
  
                // Eliminar la imagen del Storage
                this.storage.ref(filePath).delete().subscribe(() => {
                  // Eliminar los datos del paseador en la Realtime Database
                  this.db.object(`paseadores/${uid}/${paseadorId}`).remove().then(() => {
                    alert('Tu publicación como paseador ha sido eliminada correctamente.');
                    this.loadPaseadorData();  // Método para cargar nuevamente las publicaciones
                  }).catch(error => {
                    console.error('Error al eliminar los datos del paseador:', error);
                  });
                }, error => {
                  console.error('Error al eliminar la imagen del paseador en Firebase Storage:', error);
                });
              } else {
                console.error('El paseador no tiene una imagen asociada.');
              }
            } else {
              console.error('No se encontró la publicación como paseador.');
            }
          });
        } else {
          console.error('No se encontró un usuario logueado.');
        }
      });
    }
  }
  
  // Método auxiliar para extraer el archivo de la URL
  getFilePathFromUrl(url: string): string {
    // Parsear la URL para obtener la ruta del archivo en Storage
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/sacatucan.appspot.com/o/';
    const decodedUrl = decodeURIComponent(url); // Decodificar la URL
    return decodedUrl.substring(baseUrl.length, decodedUrl.indexOf('?'));  // Obtener solo el path del archivo
  }
}
