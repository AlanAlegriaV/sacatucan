import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaseadorFormPageRoutingModule } from './paseador-form-routing.module';

import { PaseadorFormPage } from './paseador-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaseadorFormPageRoutingModule
  ],
  declarations: [PaseadorFormPage]
})
export class PaseadorFormPageModule {}
