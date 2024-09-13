import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainpagePage } from './mainpage.page';

const routes: Routes = [
  {
    path: '',
    component: MainpagePage,
    children: [
      {
        path: 'paseadores',
        loadChildren: () => import('../paseadores/paseadores.module').then(m => m.PaseadoresPageModule)
      },
      {
        path: 'mascotas',
        loadChildren: () => import('../mascotas/mascotas.module').then(m => m.MascotasPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/mainpage/paseadores',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule {}
