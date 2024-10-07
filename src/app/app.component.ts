import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importamos Router para hacer la redirección
import { MenuController } from '@ionic/angular'; // Importamos el controlador de menú

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  usuarioAutenticado: boolean = false;  // Variable para saber si hay un usuario autenticado

  constructor(private router: Router, private menuCtrl:  MenuController) {
    // Escuchar los cambios de ruta para verificar la autenticación cada vez que el usuario navega
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.verificarAutenticacion(); // Verificar si hay un usuario autenticado cada vez que cambia la ruta
      }
    });
  }
  
  goToMensajes() {
    // Cerrar el side menu antes de redirigir
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/mensaje']);
    });
  }

  goToPublicacionPaseador() {
    // Cerrar el side menu antes de redirigir
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/publicacion-paseador']);
    });
  }

  goToPublicacionMascotas() {
    // Cerrar el side menu antes de redirigir
    this.menuCtrl.close().then(() => {
      this.router.navigate(['/publicacion-mascotas']);
    });
  }



  ngOnInit() {
    this.verificarAutenticacion();  // Verificar la autenticación al iniciar la aplicación
  }

  // Método para verificar si hay un usuario autenticado
  verificarAutenticacion() {
    const correoLogueado = localStorage.getItem('correoLogueado');
    if (correoLogueado) {
      this.usuarioAutenticado = true;  // Si existe un correo en el localStorage, hay un usuario autenticado
    } else {
      this.usuarioAutenticado = false;  // Si no hay un correo, no hay usuario autenticado
    }
  }

  // Función para cerrar sesión
  cerrarSesion() {
    this.menuCtrl.close().then(() => {
    // Eliminar la información de sesión (correo logueado)
    localStorage.removeItem('correoLogueado');  
    localStorage.removeItem('usuarioActual'); // También puedes eliminar otros datos si es necesario

    // Cambiar el estado de autenticación
    this.usuarioAutenticado = false;

    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
    });
  }
}