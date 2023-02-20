import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit, OnDestroy{

  id: string = ''
  listRespuestas: any[] = []
  spinner: boolean = false
  suscripcion: Subscription = new Subscription()


  constructor(private _respuestaQuizzService: RespuestaQuizzService, private aRoute: ActivatedRoute, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.id = this.aRoute.snapshot.paramMap.get('id')!
    this.obtenerRespuestas()
  }
  
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  obtenerRespuestas() {
    this.spinner = true
    this.suscripcion = this._respuestaQuizzService.getRespuestaByIdCuestionario(this.id).subscribe({
      next: (value) => {
        this.spinner = false
        this.listRespuestas = []
        value.forEach((element: any) => {
          this.listRespuestas.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        })
        console.log(this.listRespuestas)
      },
      error: (error) => {
        console.log('Ha habido un error', error)
        this.spinner = false
      }
    })
  }

  eliminarRespuesta(id: string){
    this.spinner = true
    this._respuestaQuizzService.deleteRespuesta(id).then((data) => {
      this.toastr.info('La respuesta fue eliminada', 'Respuesta eliminada')
      this.spinner = false
    },).catch((error) => {
      console.log('Ha habido un errro', error)
      this.toastr.error('Opss, hubo un error', 'Error')
      this.spinner = false
    })
  }

}
