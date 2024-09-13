import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePaseadorPageRoutingModule } from './detalle-paseador-routing.module';
import { DetallePaseadorPage } from './detalle-paseador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePaseadorPageRoutingModule
  ],
  declarations: [DetallePaseadorPage]
})
export class DetallePaseadorPageModule {}
