import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicarMascotaModalPage } from './publicar-mascota-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PublicarMascotaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicarMascotaModalPageRoutingModule {}
