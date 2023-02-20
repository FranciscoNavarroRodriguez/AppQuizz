import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespuestaUsuarioComponent } from '../shared/components/respuesta-usuario/respuesta-usuario.component';
import { ContadorInicialComponent } from './components/contador-inicial/contador-inicial.component';
import { IngresarNombreComponent } from './components/ingresar-nombre/ingresar-nombre.component';
import { RealizarQuizzComponent } from './components/realizar-quizz/realizar-quizz.component';

const routes: Routes = [
  {
    path: '',
    component: IngresarNombreComponent
  },
  {
    path: 'contador',
    component: ContadorInicialComponent
  },
  {
    path: 'realizar-quizz',
    component: RealizarQuizzComponent
  },
  {
    path: 'respuesta-usuario/:id',
    component: RespuestaUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugarRoutingModule { }
