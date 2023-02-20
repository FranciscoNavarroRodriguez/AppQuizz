import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnDestroy{

  pin: string = ''
  error: boolean = false
  errorText: string = ''
  spinner: boolean = false
  suscripcion: Subscription = new Subscription()

  constructor(private _respuestaQuizz: RespuestaQuizzService, private router: Router){}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ingresar(){
    if(!this.pin){
      this.errorMensaje('Introduzca PIN')
      return
    }
    this.spinner = true
    this.suscripcion = this._respuestaQuizz.searchByCode(this.pin).subscribe({
      next: (value) => {
        this.spinner = false
        if(value.empty){
          this.errorMensaje('PIN incorrecto')
        } else{
          value.forEach((element: any) => {
            const cuestionario: Cuestionario = {
              id: element.id,
              ...element.data()
            }
            this._respuestaQuizz.cuestionario = cuestionario
            this.router.navigate(['/jugar'])
          });
        }
      },
      error: (error) => {
        this.spinner = false
        console.log('Incorrecto', error)
      }
    })

  }


  errorMensaje(mensaje: string): void{
    this.errorText = mensaje
    this.error = true
    this.pin = ''

    setTimeout(() => {
      this.error = false
    }, 3000);
  }

}
