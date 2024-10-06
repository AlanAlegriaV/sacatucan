import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuario = {
    correo: '',
    password: ''
  };

  error: string = ''; // Variable para almacenar el mensaje de error

  constructor(private router: Router) { }

  ionViewWillEnter() {
    // Limpiar los datos del formulario cuando se accede a la página de login
    this.usuario.correo = '';
    this.usuario.password = '';
  }

  goToRegister() {
    this.router.navigate(['/registro']);  // Asegúrate de que la ruta '/registro' esté configurada
  }


  iniciarSesion() {
    // Obtener los usuarios almacenados en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Buscar el usuario por correo y contraseña
    const usuarioValido = usuarios.find((user: any) => 
      user.correo === this.usuario.correo && user.password === this.usuario.password
    );

    // Depuración: Comparar contraseñas en consola
    console.log("Contraseña almacenada:", usuarioValido ? usuarioValido.password : 'No encontrada');
    console.log("Contraseña ingresada:", this.usuario.password);

    if (usuarioValido) {
      // Si el usuario es válido, limpiar el error y redirigir a la página principal
      this.error = '';  
      alert('Inicio de sesión exitoso');
      // Guardar el correo del usuario logueado en localStorage
      localStorage.setItem('correoLogueado', usuarioValido.correo);
      // Redirigir a la página principal
      this.router.navigate(['/mainpage']);
    } else {
      // Si no coincide, mostrar mensaje de error
      this.error = 'Correo o contraseña incorrectos. Intenta nuevamente.';
    }
  }
}
