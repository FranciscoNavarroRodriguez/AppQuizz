import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CuestionariosComponent } from './components/cuestionarios/cuestionarios.component';
import { CrearQuizzComponent } from './components/crear-quizz/crear-quizz.component';
import { SharedModule } from '../shared/shared.module';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';
import { ListPreguntasComponent } from './components/list-preguntas/list-preguntas.component';
import { VerCuestionariosComponent } from './components/ver-cuestionarios/ver-cuestionarios.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    CuestionariosComponent,
    CrearQuizzComponent,
    CrearPreguntasComponent,
    ListPreguntasComponent,
    VerCuestionariosComponent,
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
