import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-paseador-form',
  templateUrl: './paseador-form.page.html',
  styleUrls: ['./paseador-form.page.scss'],
})
export class PaseadorFormPage {

  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  telefono: string = '';
  descripcion: string = '';
  foto: string = '';

  constructor(private authService: AuthService, private modalController: ModalController) {
    const usuario = this.authService.getUsuarioActual();  // Obtener los datos del usuario logueado
    if (usuario) {
      this.nombre = usuario.nombre;
      this.apellidos = usuario.apellidos;
      this.email = usuario.email;
    }
  }

  subirFoto(event: Event) {
    const input = event.target as HTMLInputElement;
  
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.foto = e.target.result;  // Asignar la URL de la imagen para mostrarla en el formulario
      };
  
      reader.readAsDataURL(file);
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  }
  publicarComoPaseador() {
    const paseador = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      email: this.email,
      telefono: this.telefono,
      descripcion: this.descripcion,
      foto: this.foto
    };

    const isRegistered = this.authService.registrarPaseador(paseador);
    if (isRegistered) {
      console.log('Paseador registrado:', paseador);
      this.cerrarModal();
    } else {
      console.error('Error al registrar al paseador');
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
