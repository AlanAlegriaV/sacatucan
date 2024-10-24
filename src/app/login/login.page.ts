import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importamos AngularFireAuth

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

  constructor(private router: Router, private afAuth: AngularFireAuth) { }

  ionViewWillEnter() {
    // Limpiar los datos del formulario cuando se accede a la página de login
    this.usuario.correo = '';
    this.usuario.password = '';
  }

  goToRegister() {
    this.router.navigate(['/registro']);  // Asegúrate de que la ruta '/registro' esté configurada
  }

  async iniciarSesion() {
    try {
      // Intentamos iniciar sesión con Firebase Authentication
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.usuario.correo, this.usuario.password);

      // Si el inicio de sesión es exitoso
      console.log("Inicio de sesión exitoso:", userCredential.user);
      this.error = '';  
      alert('Inicio de sesión exitoso');
      
      // Redirigir a la página principal
      this.router.navigate(['/mainpage']);
      
    } catch (error) {
      // Manejo de errores
      console.error("Error al iniciar sesión:", error);
      this.error = 'Correo o contraseña incorrectos. Intenta nuevamente.';
    }
  }
}
