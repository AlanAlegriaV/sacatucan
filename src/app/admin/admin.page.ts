import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  usuarios: any[] = []; // Propiedad para almacenar los usuarios

  constructor(private db: AngularFireDatabase, private router: Router) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  // Método para cargar usuarios desde Firebase
  cargarUsuarios() {
    this.db.object('usuarios').snapshotChanges().subscribe(snapshot => {
      const usuariosCargados: any[] = [];
      const allUsers = snapshot.payload.val() as { [key: string]: any };

      // Validar que allUsers no sea nulo y sea un objeto
      if (allUsers && typeof allUsers === 'object') {
        for (const userId in allUsers) {
          if (allUsers.hasOwnProperty(userId)) {
            const usuario = allUsers[userId];
            usuario.uid = userId; // Guardar el ID del usuario
            usuariosCargados.push(usuario); // Agregar a la lista de usuarios
          }
        }
      }

      this.usuarios = usuariosCargados; // Asignar usuarios cargados a la propiedad
      console.log('Usuarios cargados:', this.usuarios);
    }, error => {
      console.error('Error al cargar usuarios:', error);
    });
  }

  // Método para ver los detalles de un usuario
  verDetallesUsuario(usuario: any) {
    this.router.navigate(['/usuarios'], {
      queryParams: { id: usuario.id, nombre: usuario.nombre },
    });
  }
}
