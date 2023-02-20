import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-respuesta-usuario',
  templateUrl: './respuesta-usuario.component.html',
  styleUrls: ['./respuesta-usuario.component.scss']
})
export class RespuestaUsuarioComponent implements OnInit{

constructor(private _respuestaQuizzService: RespuestaQuizzService, private aRoute: ActivatedRoute, private router: Router){}

  idRespuesta: string = ''
  spinner: boolean = false
  respuestasUsuario: any
  urlAnterior: string = ''

  ngOnInit(): void {
    this.idRespuesta = this.aRoute.snapshot.paramMap.get('id')!
    this.obtenerRespuestaUsuario()
    this.urlAnterior = this.aRoute.snapshot.url[0].path
  }

  obtenerRespuestaUsuario(){
    this.spinner = true
    this._respuestaQuizzService.getRespuestaUsuario(this.idRespuesta).subscribe({
      next: (value) => {
        if(!value.exists){
          this.router.navigate(['/'])
          return
        }
        this.respuestasUsuario = value.data()
        this.spinner = false
      },
      error: (error) => {
        console.log('Ha habido un error', error)
        this.spinner = false
      }
    })
  }

  volver(){
    this.urlAnterior === 'respuesta-usuario'? this.router.navigate(['/']): this.router.navigate(['/dashboard/estadisticas', this.respuestasUsuario.idCuestionario])
  }

}
