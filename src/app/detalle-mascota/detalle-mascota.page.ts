import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importar AngularFireAuth para autenticación
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Importar AngularFireDatabase para Realtime Database

@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.page.html',
  styleUrls: ['./detalle-mascota.page.scss'],
})
export class DetalleMascotaPage implements OnInit {

  mascota: any; // Información de la mascota
  usuarioActual: any = {};  // Usuario logueado
  
  constructor(private route: ActivatedRoute, private navCtrl: NavController, private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    // Obtener el usuario actual logueado de Firebase Authentication
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;  // Obtener el UID del usuario logueado desde Firebase Auth

        if (uid) {
          // Buscar los datos del usuario actual en Realtime Database usando el UID
          this.db.object(`usuarios/${uid}`).valueChanges().subscribe(usuario => {
            if (usuario) {
              this.usuarioActual = usuario;  // Asignar los datos del usuario a usuarioActual
            } else {
              console.error('Usuario no encontrado en Realtime Database.');
            }
          }, error => {
            console.error('Error al obtener los datos del usuario desde Firebase:', error);
          });
        }
      }
    });

    // Cargar los parámetros de la mascota seleccionada desde los query params
    this.route.queryParams.subscribe(params => {
      if (params && params['mascota']) {
        this.mascota = JSON.parse(params['mascota']);  // Cargar la mascota seleccionada desde los parámetros de la ruta
      }
    });
  }

  // Método para regresar a la página anterior
  goBack() {
    this.navCtrl.back();
  }

// Método para enviar un mensaje al dueño de la mascota y guardarlo en Firebase
async contactar() {
  // Verificar si existe el UID del dueño y el ID de la mascota
  const uidDelDueño = this.mascota.uid;  // UID del dueño de la mascota
  
  if (!uidDelDueño) {
    alert('Error: no se pudo obtener la información del usuario o del dueño.');
    return;
  }

  // Formatear la fecha en "dd-mm-yyyy"
  const fechaActual = new Date();
  const dia = String(fechaActual.getDate()).padStart(2, '0');  // Añadir 0 delante si es necesario
  const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');  // Los meses en JS son de 0-11
  const año = fechaActual.getFullYear();
  const fechaFormateada = `${dia}-${mes}-${año}`;  // Formato "dd-mm-yyyy"

  // Definir el mensaje que se enviará
  const nuevoMensaje = {
    texto: `Hola, me encantaría pasear a tu mascota ${this.mascota.nombre}.`,  // Texto del mensaje
    nombreRemitente: this.usuarioActual.nombre,  // Nombre del usuario que envía el mensaje
    apellidoRemitente: this.usuarioActual.apellido,  // Apellido del usuario que envía el mensaje
    correoRemitente: this.usuarioActual.correo,  // Correo del usuario que envía el mensaje
    telefonoRemitente: this.usuarioActual.telefono,  // Teléfono del usuario que envía el mensaje
    fechaEnvio: fechaFormateada  // Fecha y hora en que se envió el mensaje
  };

  // Generar un UUID único para el mensaje
  const uuidMensaje = this.db.createPushId();

  // Guardar el mensaje en el nodo `mensajes/{uidDelDueño}/{uuidMensaje}` en Firebase Realtime Database
  this.db.object(`mensajes/${uidDelDueño}/${uuidMensaje}`).set(nuevoMensaje)
    .then(() => {
      alert('Mensaje enviado exitosamente');
    })
    .catch(error => {
      console.error('Error al guardar el mensaje en Firebase:', error);
      alert('Error al enviar el mensaje. Inténtalo de nuevo.');
    });
}

}


