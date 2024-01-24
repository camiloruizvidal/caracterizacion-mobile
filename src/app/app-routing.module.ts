import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './utils/guard/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [ AuthGuard ]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
