import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'load',
    loadChildren: () => import('./modules/datos/datos.module').then(m => m.DatosModule)
  },
  {
    path: 'registros',
    loadChildren: () => import('./modules/registros/registros.module').then(m => m.RegistrosModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
