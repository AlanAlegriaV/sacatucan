import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Importa el servicio de autenticación
import { ToastController } from '@ionic/angular';  // Importa el ToastController para mostrar mensajes Toast

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  nombre: string = '';
  apellidos: string = '';
  email: string = '';
  password: string = '';
  repitePassword: string = '';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private toastController: ToastController  // Inyecta el ToastController
  ) {}

  // Método para registrar al usuario
  async register() {
    // Validación de campos obligatorios
    if (!this.nombre || !this.apellidos || !this.email || !this.password || !this.repitePassword) {
      this.presentToast("Todos los campos son obligatorios", "danger");
      return;
    }

    // Validación de correo electrónico
    if (!this.validateEmail(this.email)) {
      this.presentToast("Correo electrónico no es válido", "danger");
      return;
    }

    // Verifica si las contraseñas coinciden
    if (this.password !== this.repitePassword) {
      this.presentToast("Las contraseñas no coinciden", "danger");
      return;
    }

    // Intentar registrar al usuario
    const isRegistered = this.authService.registerUser(this.nombre, this.apellidos, this.email, this.password);
    if (isRegistered) {
      await this.presentToast("Registro exitoso", "success");  // Mensaje de éxito
      setTimeout(() => {
        this.router.navigate(['/login2']);  // Redirige a la página de login después del registro
      }, 2000);  // Redirige después de 2 segundos
    } else {
      this.presentToast("El usuario ya existe", "danger");
    }
  }

  // Método para validar el formato del correo electrónico
  validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  // Método para mostrar un mensaje toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  // Duración de 2 segundos
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
