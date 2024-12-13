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

  goToAdmin() {
    this.router.navigate(['/admin']); // Asegúrate de que la página 'admin' esté creada y registrada en las rutas.
  }
  

  async iniciarSesion() {
    try {
      // Intentar iniciar sesión con Firebase Authentication
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.usuario.correo, this.usuario.password);
  
      // Si la autenticación es exitosa, verificamos si es administrador
      if (this.usuario.correo === 'admin_01@gmail.com' && this.usuario.password === 'Admin1234') {
        console.log("Inicio de sesión como administrador exitoso:", userCredential.user);
        this.error = '';
        alert('Inicio de sesión como administrador exitoso');
  
        // Redirigir a la página de administración
        this.router.navigate(['/admin']);
      } else {
        // Si no es administrador, es un usuario normal
        console.log("Inicio de sesión como usuario normal exitoso:", userCredential.user);
        this.error = '';
        alert('Inicio de sesión exitoso');
  
        // Redirigir a la página principal
        this.router.navigate(['/mainpage']);
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error al iniciar sesión:", error);
      this.error = 'Correo o contraseña incorrectos. Intenta nuevamente.';
      this.usuario.correo = '';
      this.usuario.password = '';
    }
  }
    
}
