import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.page.html',
  styleUrls: ['./detalle-mascota.page.scss'],
})
export class DetalleMascotaPage implements OnInit {

  mascota: any; // Información de la mascota
  usuarioActual: any = {};  // Usuario logueado

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    const correoLogueado = localStorage.getItem('correoLogueado');  // Obtener el correo del usuario logueado

    if (correoLogueado) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');  // Obtener la lista de usuarios
      this.usuarioActual = usuarios.find((user: any) => user.correo === correoLogueado);  // Buscar el usuario logueado
    }

    this.route.queryParams.subscribe(params => {
      if (params && params['mascota']) {
        this.mascota = JSON.parse(params['mascota']);  // Cargar la mascota seleccionada
      }
    });
  }

  // Método para regresar a la página anterior
  goBack() {
    this.navCtrl.back();
  }

  // Método para enviar un mensaje al dueño de la mascota
  contactar() {
    const mensajes = JSON.parse(localStorage.getItem(`mensajes_${this.mascota.correo}`) || '[]');
    const nuevoMensaje = {
      texto: `Hola, me encantaría pasear a tu mascota ${this.mascota.nombre}.`,  // Incluir el nombre de la mascota
      nombre: this.usuarioActual.nombre,
      apellido: this.usuarioActual.apellido,
      correo: this.usuarioActual.correo,
      telefono: this.usuarioActual.telefono
    };
    mensajes.push(nuevoMensaje);
    localStorage.setItem(`mensajes_${this.mascota.correo}`, JSON.stringify(mensajes));
    alert('Mensaje enviado exitosamente');
  }

}
