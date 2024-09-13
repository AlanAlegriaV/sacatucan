import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { PublicarModalPage } from '../publicar-modal/publicar-modal.page';  // Asegúrate de que el modal esté importado

@Component({
  selector: 'app-paseadores',
  templateUrl: './paseadores.page.html',
  styleUrls: ['./paseadores.page.scss'],
})
export class PaseadoresPage implements OnInit {

  paseadores: any[] = [];

  constructor(private navCtrl: NavController, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.cargarPaseadores();
  }

  // Método para cargar la lista de paseadores desde el localStorage
  cargarPaseadores() {
    const paseadoresData = localStorage.getItem('paseadores');
    if (paseadoresData) {
      this.paseadores = JSON.parse(paseadoresData);
    }
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
