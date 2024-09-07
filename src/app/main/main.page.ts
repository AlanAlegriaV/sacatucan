import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { PaseadorFormPage } from '../paseador-form/paseador-form.page';
import { MascotaFormPage } from '../mascota-form/mascota-form.page';  // Importar el formulario de mascota

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {
  paseadores: any[] = [];
  mascotas: any[] = [];  // Para las mascotas
  seccionActual: string = 'paseadores';  // Para controlar la sección activa

  constructor(private authService: AuthService, private modalController: ModalController) {}

  ionViewWillEnter() {
    this.cargarPaseadores();  // Cargar paseadores por defecto
  }

  cargarPaseadores() {
    this.paseadores = this.authService.obtenerPaseadores();
  }

  cargarMascotas() {
    this.mascotas = this.authService.obtenerMascotas();
  }

  cambiarSeccion(seccion: string) {
    this.seccionActual = seccion;

    if (seccion === 'paseadores') {
      this.cargarPaseadores();
    } else if (seccion === 'mascotas') {
      this.cargarMascotas();
    }
  }

  async publicarComoPaseador() {
    const modal = await this.modalController.create({
      component: PaseadorFormPage,
    });
    await modal.present();
    await modal.onWillDismiss();
    this.cargarPaseadores();
  }

  async publicarComoMascota() {
    const modal = await this.modalController.create({
      component: MascotaFormPage,  // Asegúrate de que este es el componente correcto
    });
    await modal.present();
    await modal.onWillDismiss();  // Espera a que el modal se cierre antes de cargar las mascotas
    this.cargarMascotas();
  }
}
