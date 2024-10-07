import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'mainpage',
    loadChildren: () => import('./mainpage/mainpage.module').then( m => m.MainpagePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'paseadores',
    loadChildren: () => import('./paseadores/paseadores.module').then( m => m.PaseadoresPageModule)
  },
  {
    path: 'detalle-paseador',
    loadChildren: () => import('./detalle-paseador/detalle-paseador.module').then( m => m.DetallePaseadorPageModule)
  },
  {
    path: 'mascotas',
    loadChildren: () => import('./mascotas/mascotas.module').then( m => m.MascotasPageModule)
  },
  {
    path: 'publicar-modal',
    loadChildren: () => import('./publicar-modal/publicar-modal.module').then( m => m.PublicarModalPageModule)
  },
  {
    path: 'publicar-mascota-modal',
    loadChildren: () => import('./publicar-mascota-modal/publicar-mascota-modal.module').then( m => m.PublicarMascotaModalPageModule)
  },
  {
    path: 'mascotas-modal-edit',
    loadChildren: () => import('./mascotas-modal-edit/mascotas-modal-edit.module').then( m => m.MascotasModalEditPageModule)
  },
  {
    path: 'detalle-mascota',
    loadChildren: () => import('./detalle-mascota/detalle-mascota.module').then( m => m.DetalleMascotaPageModule)
  },
  {
    path: 'mensaje',
    loadChildren: () => import('./mensaje/mensaje.module').then( m => m.MensajePageModule)
  },
  {
    path: 'publicacion-paseador',
    loadChildren: () => import('./publicacion-paseador/publicacion-paseador.module').then( m => m.PublicacionPaseadorPageModule)
  },
  {
    path: 'publicacion-mascotas',
    loadChildren: () => import('./publicacion-mascotas/publicacion-mascotas.module').then( m => m.PublicacionMascotasPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
