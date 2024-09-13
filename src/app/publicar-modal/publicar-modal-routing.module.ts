import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicarModalPage } from './publicar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PublicarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicarModalPageRoutingModule {}
