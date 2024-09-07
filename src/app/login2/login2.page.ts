import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Importa el servicio de autenticación
import { ToastController } from '@ionic/angular';  // Importa el ToastController para mostrar mensajes Toast

@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page {

  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Para mostrar mensajes de error

  constructor(
    private router: Router, 
    private authService: AuthService,
    private toastController: ToastController  // Inyecta el ToastController
  ) {}

  // Método para iniciar sesión
  async login() {
    // Validar que los campos no estén vacíos
    if (!this.email || !this.password) {
      this.presentToast("El correo y la contraseña son obligatorios", "danger");
      return;
    }

    // Validar el formato del correo electrónico
    if (!this.authService.validateEmail(this.email)) {
      this.presentToast("El correo electrónico no es válido", "danger");
      return;
    }

    // Intentar iniciar sesión
    const isLoggedIn = this.authService.loginUser(this.email, this.password);
    if (isLoggedIn) {
      this.presentToast("Inicio de sesión exitoso", "success");
      setTimeout(() => {
        this.router.navigate(['/main']);  // Redirige a la página principal si el login es exitoso
      }, 2000);  // Redirige después de 2 segundos
    } else {
      this.presentToast("Correo o contraseña incorrectos", "danger");
    }
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
