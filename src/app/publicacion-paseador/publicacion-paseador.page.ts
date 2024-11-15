import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PublicarModalPage } from '../publicar-modal/publicar-modal.page'; // Modal para editar paseador
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { take } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-publicacion-paseador',
  templateUrl: './publicacion-paseador.page.html',
  styleUrls: ['./publicacion-paseador.page.scss'],
})
export class PublicacionPaseadorPage {
  usuario: any = {};  // Información del usuario logueado
  misPaseadores: any[] = [];  // Publicaciones del usuario como paseador
  mostrarPaseadores: boolean = true;

  constructor(private modalCtrl: ModalController, private afAuth: AngularFireAuth, private db: AngularFireDatabase,  private storage: AngularFireStorage, private changeDetector: ChangeDetectorRef ) { }

  ionViewWillEnter() {
    this.cargarDatosUsuario();  // Cargar datos del usuario al entrar en la vista
    this.verMisPaseadores();    // Cargar automáticamente la publicación de paseador
  }

  loadPaseadorData() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        const uid = user.uid;
  
        // Cargamos nuevamente los paseadores desde la Realtime Database
        this.db.object(`paseadores/${uid}`).valueChanges().subscribe((paseador: any) => {
          if (paseador) {
            this.misPaseadores = [paseador];  // Coloca el objeto en un array para mantener la estructura
            console.log('Publicación de paseador actualizada:', this.misPaseadores);
          } else {
            console.log('No se encontró ninguna publicación de paseador para este usuario.');
            this.misPaseadores = []; // Limpia el array si no hay publicación
          }
           // Forzar la detección de cambios para asegurar la actualización en el template
        this.changeDetector.detectChanges()
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
        this.db.object(`paseadores/${uid}`).valueChanges().subscribe((paseador: any) => {
          if (paseador) {
            this.misPaseadores = [paseador];  // Almacena el paseador en un array para mantener la estructura
            console.log('Mis paseadores:', this.misPaseadores);
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
  
        // Desuscribimos cualquier suscripción previa en caso de que esté activa
        this.db.object(`paseadores/${uid}`).valueChanges().pipe(take(1)).subscribe((paseador: any) => {
          if (paseador && paseador.imagen) {
            const filePath = this.getFilePathFromUrl(paseador.imagen);
            this.storage.ref(filePath).delete().subscribe(() => {
              this.db.object(`paseadores/${uid}`).remove().then(() => {
                alert('Tu publicación como paseador ha sido eliminada correctamente.');
                
                this.loadPaseadorData();  // Método para cargar nuevamente las publicaciones
              }).catch(error => {
                console.error('Error al eliminar los datos del paseador:', error);
              });
            }, error => {
              console.error('Error al eliminar la imagen del paseador en Firebase Storage:', error);
            });
          } else {
            console.error('No se encontró ninguna publicación de paseador o el paseador no tiene una imagen.');
          }
        });
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
