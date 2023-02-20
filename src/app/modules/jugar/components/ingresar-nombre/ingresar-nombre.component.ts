import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.scss']
})
export class IngresarNombreComponent implements OnInit{

  nombre: string = ''
  mostrarError: boolean = false

  constructor(private _respuestaQuizz: RespuestaQuizzService, private router: Router){}

  ngOnInit(): void {
    console.log(this._respuestaQuizz.cuestionario)
    if(this._respuestaQuizz.cuestionario == undefined){
      this.router.navigate(['/'])
    }
  }

  obtenerNombre(){
    if(!this.nombre){
      this.error()
      return
    }
    this._respuestaQuizz.nombre = this.nombre
    this.router.navigate(['/jugar/contador'])
  }


  error(){
    this.mostrarError = true
      setTimeout(() => {
        this.mostrarError = false
      }, 3000);
  }

}
