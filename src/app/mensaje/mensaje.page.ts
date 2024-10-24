import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Para Firebase Authentication
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Para Firebase Realtime Database
import { Subscription } from 'rxjs';  // Para manejar las suscripciones a Firebase

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.page.html',
  styleUrls: ['./mensaje.page.scss'],
})
export class MensajePage {
  usuario: any = {};  // Información del usuario logueado
  mensajesRecibidos: any[] = []; // Mensajes recibidos
  firebaseSub: Subscription| undefined;  // Suscripción a Firebase
  
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private afAuth: AngularFireAuth, private db: AngularFireDatabase ) {}

  ionViewWillEnter() {
    this.cargarDatosUsuario();  // Cargar datos del usuario al entrar en la vista
  }

  cargarDatosUsuario() {
    // Obtener el estado de autenticación actual
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // Si el usuario está autenticado, obtener su información
        const uid = user.uid;
        this.usuario = {
          correo: user.email,  // Correo del usuario logueado desde Firebase Auth
          uid: uid  // UID del usuario
        };

        // Cargar los mensajes del usuario desde Firebase
        this.verMensajes(uid);
      } else {
        console.error('No hay usuario autenticado.');
      }
    });
  }

  verMensajes(uid: string) {
    // Suscribirse al nodo de mensajes del usuario en Realtime Database
    this.firebaseSub = this.db.list(`mensajes/${uid}`).valueChanges().subscribe(mensajes => {
      if (mensajes && mensajes.length > 0) {
        this.mensajesRecibidos = mensajes;  // Asignar los mensajes recibidos
      } else {
        this.mensajesRecibidos = [];  // No hay mensajes, asignar un arreglo vacío
      }
    }, error => {
      console.error('Error al cargar los mensajes desde Firebase:', error);
    });
  }

  ionViewWillLeave() {
    // Cancelar la suscripción a Firebase cuando se abandona la página
    if (this.firebaseSub) {
      this.firebaseSub.unsubscribe();
    }
  }

    // Método para regresar a la página anterior
    goBack() {
      this.navCtrl.back();
    }    
}
