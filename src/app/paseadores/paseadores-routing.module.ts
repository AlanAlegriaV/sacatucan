import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaseadoresPage } from './paseadores.page';

const routes: Routes = [
  {
    path: '',
    component: PaseadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaseadoresPageRoutingModule {}
