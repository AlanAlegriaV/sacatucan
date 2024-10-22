import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Importamos Router para hacer la redirección
import { MenuController } from '@ionic/angular'; // Importamos el controlador de menú
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  usuarioAutenticado: boolean = false;  // Variable para saber si hay un usuario autenticado

  constructor(private router: Router, private menuCtrl:  MenuController, private afAuth: AngularFireAuth) {
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

  verificarAutenticacion(): boolean{
    return this.afAuth.authState !== null;
  }

  
  // Función para cerrar sesión
  async cerrarSesion(): Promise<any> {
    try {
      await this.menuCtrl.close(); //cerrar el menu lateral
      await this.afAuth.signOut();
      console.log('Sesion cerrada satisfactoriamente');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error al cerrar sesion', error);
      throw error;
    }
  }
}