import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PublicarModalPage } from '../publicar-modal/publicar-modal.page'; // Modal para editar paseador

@Component({
  selector: 'app-publicacion-paseador',
  templateUrl: './publicacion-paseador.page.html',
  styleUrls: ['./publicacion-paseador.page.scss'],
})
export class PublicacionPaseadorPage {
  usuario: any = {};  // Información del usuario logueado
  misPaseadores: any[] = [];  // Publicaciones del usuario como paseador
  mostrarPaseadores: boolean = true;

  constructor(private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    this.cargarDatosUsuario();  // Cargar datos del usuario al entrar en la vista
    this.verMisPaseadores();    // Cargar automáticamente la publicación de paseador
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

  verMisPaseadores() {
    const correoLogueado = localStorage.getItem('correoLogueado');
    const paseadores: any[] = JSON.parse(localStorage.getItem('paseadores') || '[]');
    this.misPaseadores = paseadores.filter((paseador: any) => paseador.correo === correoLogueado);
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
      const paseadores = JSON.parse(localStorage.getItem('paseadores') || '[]');
      const nuevosPaseadores = paseadores.filter((p: any) => p.correo !== this.usuario.correo);
      localStorage.setItem('paseadores', JSON.stringify(nuevosPaseadores));
      this.verMisPaseadores();
    }
  }
}
