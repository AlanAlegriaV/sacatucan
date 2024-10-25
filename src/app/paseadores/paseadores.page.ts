import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { PublicarModalPage } from '../publicar-modal/publicar-modal.page';  // Asegúrate de que el modal esté importado
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-paseadores',
  templateUrl: './paseadores.page.html',
  styleUrls: ['./paseadores.page.scss'],
})
export class PaseadoresPage implements OnInit {

  paseadores: any[] = [];

  constructor( private navCtrl: NavController, private modalCtrl: ModalController, private db: AngularFireDatabase ) {}

  ngOnInit() {
    this.cargarPaseadores();  // Se ejecuta automáticamente cuando se inicializa el componente
  }

  // Método para cargar la lista de paseadores desde Firebase Realtime Database
  cargarPaseadores() {
    // Referencia al nodo 'paseadores' en la base de datos
    this.db.list('paseadores').valueChanges().subscribe((paseadores: any[]) => {
      this.paseadores = paseadores;  // Asigna los datos recuperados a la variable 'paseadores'
    }, (error) => {
      console.error('Error al cargar paseadores desde Firebase:', error);
    });
  }


  // Este método se ejecuta cada vez que se entra a la vista de nuevo
  ionViewWillEnter() {
    this.cargarPaseadores(); // Refrescar la lista de paseadores
  }

  // Método para ver detalles de un paseador
  verDetalle(paseador: any) {
    this.navCtrl.navigateForward(`/detalle-paseador`, {
      queryParams: { paseador: JSON.stringify(paseador) }
    });
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
