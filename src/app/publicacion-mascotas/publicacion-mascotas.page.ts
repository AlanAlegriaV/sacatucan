import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MascotasModalEditPage } from '../mascotas-modal-edit/mascotas-modal-edit.page'; // Modal para editar mascota

@Component({
  selector: 'app-publicacion-mascotas',
  templateUrl: './publicacion-mascotas.page.html',
  styleUrls: ['./publicacion-mascotas.page.scss'],
})
export class PublicacionMascotasPage {
  
  usuario: any = {};  // Información del usuario logueado
  misMascotas: any[] = [];  // Publicaciones del usuario como mascotas
  mostrarMascotas: boolean = true;

  constructor(private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    this.cargarDatosUsuario();  // Cargar datos del usuario al entrar en la vista
    this.verMisMascotas();  // Cargar automáticamente las mascotas
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

  verMisMascotas() {
    const correoLogueado = localStorage.getItem('correoLogueado');
    const mascotas: any[] = JSON.parse(localStorage.getItem('mascotas') || '[]');
    this.misMascotas = mascotas.filter((mascota: any) => mascota.correo === correoLogueado);
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
    if (confirm(`¿Estás seguro de eliminar la publicación de la mascota ${mascota.nombre}?`)) {
      const mascotas = JSON.parse(localStorage.getItem('mascotas') || '[]');
      const nuevasMascotas = mascotas.filter((m: any) => !(m.correo === mascota.correo && m.nombre === mascota.nombre));
      localStorage.setItem('mascotas', JSON.stringify(nuevasMascotas));
      this.verMisMascotas();
    }
  }
}