import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PublicarModalPage } from '../publicar-modal/publicar-modal.page';  // Asegúrate de que el modal esté importado
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paseadores',
  templateUrl: './paseadores.page.html',
  styleUrls: ['./paseadores.page.scss'],
})
export class PaseadoresPage implements OnInit {

  paseadores: any[] = [];

  constructor( private modalCtrl: ModalController,  private router: Router, private db: AngularFireDatabase ) {}

  ngOnInit() {
    this.cargarPaseadores();  // Se ejecuta automáticamente cuando se inicializa el componente
  }

  cargarPaseadores() {
    this.db.object('paseadores').snapshotChanges().subscribe(snapshot => {
      const paseadoresCargados: any[] = [];
  
      const allPaseadores = snapshot.payload.val() as { [key: string]: any };  // Aseguramos que es un objeto
  
      // Verificamos que allPaseadores no sea nulo y que sea un objeto
      if (allPaseadores && typeof allPaseadores === 'object') {
        // Recorrer todos los paseadores directamente
        for (const uid in allPaseadores) {
          if (allPaseadores.hasOwnProperty(uid)) {
            const paseador = allPaseadores[uid];
            paseador.uid = uid;  // UID del dueño del paseador (ahora único identificador)
            paseadoresCargados.push(paseador);  // Añadir el paseador a la lista
          }
        }
      }
  
      this.paseadores = paseadoresCargados;  // Asignar todos los paseadores cargados al array de paseadores
    });
  }
  


  // Este método se ejecuta cada vez que se entra a la vista de nuevo
  ionViewWillEnter() {
    this.cargarPaseadores(); // Refrescar la lista de paseadores
  }

// Ver detalles de un paseador
async verDetalle(paseador: any) {
  const paseadorString = JSON.stringify(paseador);
  this.router.navigate(['/detalle-paseador'], { queryParams: { paseador: paseadorString } });
}


  // Método para abrir el modal de publicar
  async publicarseComoPaseador() {
    const modal = await this.modalCtrl.create({
      component: PublicarModalPage,
    });

    // Al cerrar el modal, recargar la lista de paseadores
    modal.onDidDismiss().then(() => {
      this.cargarPaseadores(); // Refrescar lista después de cerrar el modal
    });

    return await modal.present();
  }
}
