import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetallePaseadorPage } from './detalle-paseador.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePaseadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePaseadorPageRoutingModule {}
