import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaseadorFormPage } from './paseador-form.page';

const routes: Routes = [
  {
    path: '',
    component: PaseadorFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaseadorFormPageRoutingModule {}
