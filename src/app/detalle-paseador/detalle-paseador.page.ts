import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importar AngularFireAuth para autenticación
import { AngularFireDatabase } from '@angular/fire/compat/database';  // Importar AngularFireDatabase para Realtime Database

@Component({
  selector: 'app-detalle-paseador',
  templateUrl: './detalle-paseador.page.html',
  styleUrls: ['./detalle-paseador.page.scss'],
})
export class DetallePaseadorPage implements OnInit {

  paseador: any;
  usuarioActual: any = {};  // Usuario logueado
  esMiPublicacion: boolean = false;  // Bandera para saber si el usuario es el dueño de la mascota

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private db: AngularFireDatabase, private afAuth: AngularFireAuth ) { }

  ngOnInit() {
    // Obtener el usuario actual logueado de Firebase Authentication
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;  // Obtener el UID del usuario logueado desde Firebase Auth
        this.esMiPublicacion = user.uid === this.paseador.uid;
  
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
  
    // Cargar los parámetros del paseador seleccionado desde los query params
    this.route.queryParams.subscribe(params => {
      if (params && params['paseador']) {
        this.paseador = JSON.parse(params['paseador']);  // Cargar el paseador seleccionado desde los parámetros de la ruta
      }
    });
  }
  

  // Volver a la página anterior
  goBack() {
    this.navCtrl.back();
  }


  // Método para contactar al paseador y guardar el mensaje en Firebase
async contactar() {
  // Verificar si existe el UID del paseador
  const uidDelPaseador = this.paseador.uid;  // UID del paseador
  
  if (!uidDelPaseador) {
    alert('Error: no se pudo obtener la información del usuario o del paseador.');
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
    texto: `Hola, necesito tus servicios como paseador.`,  // Texto del mensaje
    nombreRemitente: this.usuarioActual.nombre,  // Nombre del usuario que envía el mensaje
    apellidoRemitente: this.usuarioActual.apellido,  // Apellido del usuario que envía el mensaje
    correoRemitente: this.usuarioActual.correo,  // Correo del usuario que envía el mensaje
    telefonoRemitente: this.usuarioActual.telefono,  // Teléfono del usuario que envía el mensaje
    fechaEnvio: fechaFormateada  // Fecha y hora en que se envió el mensaje
  };

  // Generar un UUID único para el mensaje
  const uuidMensaje = this.db.createPushId();

  // Guardar el mensaje en el nodo `mensajes/{uidDelPaseador}/{uuidMensaje}` en Firebase Realtime Database
  this.db.object(`mensajes/${uidDelPaseador}/${uuidMensaje}`).set(nuevoMensaje)
    .then(() => {
      alert('Mensaje enviado exitosamente');
    })
    .catch(error => {
      console.error('Error al guardar el mensaje en Firebase:', error);
      alert('Error al enviar el mensaje. Inténtalo de nuevo.');
    });
}

}
