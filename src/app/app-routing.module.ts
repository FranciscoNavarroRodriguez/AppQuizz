import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'usuario',
    loadChildren: () => import('../app/modules/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jugar',
    loadChildren: () => import ('../app/modules/jugar/jugar.module').then(m => m.JugarModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
