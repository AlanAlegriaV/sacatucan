import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',  // Página inicial es el registro
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login2',
    loadChildren: () => import('./login2/login2.module').then(m => m.Login2PageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'paseador-form',
    loadChildren: () => import('./paseador-form/paseador-form.module').then(m => m.PaseadorFormPageModule)
  },
  {
    path: 'recupera',
    loadChildren: () => import('./recupera/recupera.module').then(m => m.RecuperaPageModule)
  },
  {
    path: 'mascota-form',
    loadChildren: () => import('./mascota-form/mascota-form.module').then( m => m.MascotaFormPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }