import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nanoid } from 'nanoid';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { Pregunta } from 'src/app/models/Pregunta';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-list-preguntas',
  templateUrl: './list-preguntas.component.html',
  styleUrls: ['./list-preguntas.component.scss']
})
export class ListPreguntasComponent implements OnInit{

  listPreguntas: Pregunta[] = []
  titulo: string = ''
  descripcion: string = ''
  spinner: boolean = false

  constructor(private _quizzService: QuizzService, private router: Router, private toastr: ToastrService){}


  ngOnInit(): void {
    this._quizzService.getPregunta().subscribe({
      next: (value) => {
        this.listPreguntas.push(value)
      }
    })
    this.titulo = this._quizzService.tituloCuestionario
    this.descripcion = this._quizzService.descripcion
    if(this.titulo === ''){
      this.router.navigate(['/dashboard'])
    }
  }

  eliminarPregunta(indice: number){
    this.listPreguntas.splice(indice,1)
  }

  finalizarCuestionario(){

    const usuario: User = JSON.parse(localStorage.getItem('user') || '{}')

    const cuestionario: Cuestionario = {
      uid: usuario.uid ,
      titulo: this.titulo,
      descripcion: this.descripcion,
      codigo: nanoid(6).toUpperCase(),
      cantidadPreguntas: this.listPreguntas.length,
      fechaCreacion: new Date(),
      listPreguntas: this.listPreguntas
    }

    this.spinner = true

    this._quizzService.crearCuestionario(cuestionario).then((value) => {
      this.toastr.success('Formulario agregado!', 'Exito!')
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      console.log(error)
      this.spinner = false
    })
  }

}
