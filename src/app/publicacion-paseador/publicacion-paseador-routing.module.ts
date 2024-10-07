import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicacionPaseadorPage } from './publicacion-paseador.page';

const routes: Routes = [
  {
    path: '',
    component: PublicacionPaseadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacionPaseadorPageRoutingModule {}
