import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-paseador',
  templateUrl: './detalle-paseador.page.html',
  styleUrls: ['./detalle-paseador.page.scss'],
})
export class DetallePaseadorPage implements OnInit {

  paseador: any;
  usuarioActual: any = {};  // Usuario logueado

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    const correoLogueado = localStorage.getItem('correoLogueado') || '';
    
    // Buscar el usuario actual en la lista de usuarios guardados en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    this.usuarioActual = usuarios.find((usuario: any) => usuario.correo === correoLogueado) || {};

    this.route.queryParams.subscribe(params => {
      if (params && params['paseador']) {
        this.paseador = JSON.parse(params['paseador']);  // Usar corchetes para acceder a 'paseador'
      }
    });
  }

  // Volver a la página anterior
  goBack() {
    this.navCtrl.back();
  }

  // Verificar si la publicación es del usuario actual
  esMiPublicacion() {
    return this.paseador.correo === this.usuarioActual.correo;
  }

  // Método para contactar al paseador
  contactar() {
    const mensajes = JSON.parse(localStorage.getItem(`mensajes_${this.paseador.correo}`) || '[]');
    const nuevoMensaje = {
      texto: `Hola, necesito tus servicios como paseador.`,
      nombre: this.usuarioActual.nombre,
      apellido: this.usuarioActual.apellido,
      correo: this.usuarioActual.correo,
      telefono: this.usuarioActual.telefono
    };
    mensajes.push(nuevoMensaje);
    localStorage.setItem(`mensajes_${this.paseador.correo}`, JSON.stringify(mensajes));
    alert('Mensaje enviado exitosamente');
  }
}
