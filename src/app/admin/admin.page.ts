import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importamos AngularFireAuth

@Component({
  selector: 'app-login',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage {

  usuario = {
    correo: '',
    password: ''
  };


  error: string = ''; // Variable para almacenar el mensaje de error

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  ionViewWillEnter() {
    // Limpiar los datos del formulario cuando se accede a la página de login
    this.usuario.correo = '';
    this.usuario.password = '';
  }

  goToLogin() {
    this.router.navigate(['/login']);  // Asegúrate de que la ruta '/login' esté configurada
  }
  
  async iniciarSesion() {
    try {
      // Credenciales predefinidas para el administrador
      const adminEmail = 'admin_01@gmail.com';
      const adminPassword = 'Admin1234';
  
      // Verificar si las credenciales ingresadas coinciden con las del administrador
      if (this.usuario.correo === adminEmail && this.usuario.password === adminPassword) {
        // Inicio de sesión exitoso
        console.log('Inicio de sesión como administrador exitoso');
        this.error = '';
        alert('Inicio de sesión como administrador exitoso');
  
        // Redirigir a la página de administración
        this.router.navigate(['/mainpage']); // Asegúrate de que la página "adminpage" exista y esté configurada en las rutas
      } else {
        // Credenciales incorrectas
        this.error = 'Correo o contraseña de administrador incorrectos. Intenta nuevamente.';
        alert(this.error);
        this.usuario.correo = '';
        this.usuario.password = '';
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error al iniciar sesión como administrador:', error);
      this.error = 'Ocurrió un error inesperado. Intenta nuevamente.';
    }
  }
  }
