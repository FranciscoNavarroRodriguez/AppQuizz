import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespuestaUsuarioComponent } from '../shared/components/respuesta-usuario/respuesta-usuario.component';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';
import { CrearQuizzComponent } from './components/crear-quizz/crear-quizz.component';
import { CuestionariosComponent } from './components/cuestionarios/cuestionarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { VerCuestionariosComponent } from './components/ver-cuestionarios/ver-cuestionarios.component';

const routes: Routes = [
  {
    path: '',
    component: CuestionariosComponent
  },
  {
    path: 'crear-cuestionario',
    component: CrearQuizzComponent
  },
  {
    path: 'crear-preguntas',
    component: CrearPreguntasComponent
  },
  {
    path: 'ver-cuestionario/:id',
    component: VerCuestionariosComponent
  },
  {
    path: 'estadisticas/:id',
    component: EstadisticasComponent
  },
  {
    path: 'respuestaUsuarioAdmin/:id',
    component: RespuestaUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
