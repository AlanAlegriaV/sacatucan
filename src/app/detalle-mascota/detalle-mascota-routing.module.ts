import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMascotaPage } from './detalle-mascota.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMascotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMascotaPageRoutingModule {}
