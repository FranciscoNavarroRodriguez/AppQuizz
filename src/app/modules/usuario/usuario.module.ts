import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { SharedModule } from '../shared/shared.module';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }
