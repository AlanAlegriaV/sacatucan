import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.page.html',
  styleUrls: ['./mensaje.page.scss'],
})
export class MensajePage {
  usuario: any = {};  // Información del usuario logueado
  mensajesRecibidos: any[] = []; // Mensajes recibidos

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ionViewWillEnter() {
    this.cargarDatosUsuario();  // Cargar datos del usuario al entrar en la vista
    this.verMensajes();  // Mostrar los mensajes automáticamente al cargar la página
  }

  cargarDatosUsuario() {
    const correoLogueado = localStorage.getItem('correoLogueado'); // Obtener el correo del usuario logueado

    if (correoLogueado) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioLogueado = usuarios.find((user: any) => user.correo === correoLogueado);

      if (usuarioLogueado) {
        this.usuario = {
          nombre: usuarioLogueado.nombre,
          apellido: usuarioLogueado.apellido,
          correo: usuarioLogueado.correo,
          telefono: usuarioLogueado.telefono,
          region: usuarioLogueado.region,
          comuna: usuarioLogueado.comuna
        };
      }
    }
  }

  verMensajes() {
    const correoLogueado = localStorage.getItem('correoLogueado');
    this.mensajesRecibidos = JSON.parse(localStorage.getItem(`mensajes_${correoLogueado}`) || '[]');
  }

    // Método para regresar a la página anterior
    goBack() {
      this.navCtrl.back();
    }    
}
