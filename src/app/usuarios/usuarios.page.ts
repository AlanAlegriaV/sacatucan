import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  mascotas: any[] = [];
  paseador: any = null;
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params['uid']) {
        this.userId = params['uid'];
        console.log('UID del usuario seleccionado:', this.userId);
        this.cargarMascotas(); // Llamar al método para cargar las mascotas
        this.cargarPaseador(); // Llamar al método para cargar el paseador
      }
    });
  }

  ngOnInit() {
    // Obtener el ID del usuario seleccionado de los parámetros de la ruta
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      if (this.userId) {
        this.cargarMascotas();
        this.cargarPaseador();
      }
    });
  }

  cargarMascotas() {
    this.db
      .object(`mascotas/${this.userId}`)
      .valueChanges()
      .subscribe((mascotas: any) => {
        console.log('Datos de mascotas recibidos de Firebase:', mascotas);
        if (mascotas) {
          this.mascotas = Object.keys(mascotas).map((key) => ({
            ...mascotas[key],
            id: key,
          }));
          console.log('Mascotas procesadas:', this.mascotas);
        }
      });
  }
  
  cargarPaseador() {
    this.db
      .object(`paseadores/${this.userId}`)
      .valueChanges()
      .subscribe((paseador: any) => {
        console.log('Datos de paseador recibidos de Firebase:', paseador);
        if (paseador) {
          this.paseador = paseador;
          console.log('Paseador procesado:', this.paseador);
        }
      });
  }

  eliminarMascota(mascota: any) {
    if (confirm(`¿Estás seguro de eliminar a ${mascota.nombre}?`)) {
      // Construye el path correcto para eliminar la mascota
      const mascotaPath = `mascotas/${this.userId}/${mascota.mascotaId}`; 
  
      this.db
        .object(mascotaPath)
        .remove()
        .then(() => {
          alert(`Mascota "${mascota.nombre}" eliminada correctamente.`);
          // Remover la mascota de la lista local
          this.mascotas = this.mascotas.filter((item) => item.mascotaId !== mascota.mascotaId);
        })
        .catch((error) => {
          console.error('Error al eliminar la mascota:', error);
          alert('Hubo un error al intentar eliminar la mascota.');
        });
    }
  }
  
// Eliminar la publicación de paseador
eliminarPaseador() {
  if (confirm('¿Estás seguro de eliminar esta publicación de paseador?')) {
    const paseadorPath = `paseadores/${this.userId}`; // Asegúrate de que este path sea correcto
    this.db
      .object(paseadorPath)
      .remove()
      .then(() => {
        alert('Publicación de paseador eliminada correctamente.');
        this.paseador = null; // Limpiar localmente
      })
      .catch((error) => {
        console.error('Error al eliminar el paseador:', error);
        alert('Hubo un error al intentar eliminar la publicación de paseador.');
      });
  }
}

}
