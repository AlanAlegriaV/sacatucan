import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.page.html',
  styleUrls: ['./mascota-form.page.scss'],
})
export class MascotaFormPage {
  nombre: string = '';
  edad: number | null = null;  // Permitir que sea null al inicio
  sexo: string = '';
  descripcion: string = '';
  foto: string = '';

  constructor(private authService: AuthService, private modalController: ModalController) {}

  subirFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  publicarComoMascota() {
    const mascota = {
      nombre: this.nombre,
      edad: this.edad,
      sexo: this.sexo,
      descripcion: this.descripcion,
      foto: this.foto,
    };

    this.authService.registrarMascota(mascota);
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
