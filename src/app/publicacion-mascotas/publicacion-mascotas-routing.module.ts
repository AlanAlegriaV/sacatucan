import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacionMascotasPage } from './publicacion-mascotas.page';

const routes: Routes = [
  {
    path: '',
    component: PublicacionMascotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacionMascotasPageRoutingModule {}
