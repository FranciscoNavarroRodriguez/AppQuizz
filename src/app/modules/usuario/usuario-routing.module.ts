import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegisterComponent } from './components/register/register.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'recuperar-password',
    component: RecuperarPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verificar-correo',
    component: VerificarCorreoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
