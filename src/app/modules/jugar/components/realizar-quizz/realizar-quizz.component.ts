import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { Respuesta } from 'src/app/models/Respuesta';
import { RespuestaQuizzService } from 'src/app/services/respuesta-quizz.service';

@Component({
  selector: 'app-realizar-quizz',
  templateUrl: './realizar-quizz.component.html',
  styleUrls: ['./realizar-quizz.component.scss']
})
export class RealizarQuizzComponent implements OnInit{

  cuestionario: Cuestionario | undefined
  nombre: string = ''
  indicePregunta: number = 0
  segundos: number = 0
  setInterval: any
  btnText = 'Aceptar'
  respuestaAceptada: boolean = false
  loading: boolean = false

  //Respuesta usuario
  respuestaSeleccionada: any
  indiceRespuesta: any = 0
  cantidadCorrectas: number = 0
  cantidadIncorrectas: number = 0
  puntosTotales: number = 0
  listRespuestasUsuario: any[] = []



  constructor(private respuestaQuizz: RespuestaQuizzService, private router: Router){}

  ngOnInit(): void {
    this.cuestionario = this.respuestaQuizz.cuestionario
    this.nombre = this.respuestaQuizz.nombre
    this.validateRefresh()
    this.iniciarContador()
  }

  validateRefresh(){
    if(this.cuestionario == undefined){
      this.router.navigate(['/'])
    }
  }

  obtenerTitulo(): string{
    return this.cuestionario?.listPreguntas[this.indicePregunta].titulo!
  }
  obtenerSegundos(): number{
    return this.cuestionario?.listPreguntas[this.indicePregunta].segundos!
  }
  obtenerRespuestas(): Respuesta[]{
    return this.cuestionario?.listPreguntas[this.indicePregunta].listRespuestas!
  }

  seleccionarRespuesta(respuesta: any, indice: number){
    if(this.respuestaAceptada){
      return
    }
    this.respuestaSeleccionada = respuesta
    this.indiceRespuesta = indice
  }

  addClass(respuesta: any): string{
    if(this.respuestaAceptada && respuesta.esCorrecta && this.respuestaSeleccionada === respuesta){
      return 'opcion-success'
    }
    if(this.respuestaAceptada && !respuesta.esCorrecta && this.respuestaSeleccionada === respuesta){
      return 'opcion-error'
    }
    if(!this.respuestaAceptada && this.respuestaSeleccionada === respuesta){
      return 'opcion-default'
    } 
    else {
      return ''
    }
  }

  iniciarContador() {
    this.segundos = this.obtenerSegundos()
    this.setInterval = setInterval(() => {
      if(this.segundos === 1){
        clearInterval(this.setInterval)
        this.agregarRespuesta()
      } else{
        this.segundos --
      }
    },1000)
  }

  siguientePregunta(){
    if(this.respuestaAceptada){
      this.agregarRespuesta()
    } else {
      clearInterval(this.setInterval)
      this.respuestaAceptada = true
      this.btnText = this.indicePregunta === this.cuestionario?.cantidadPreguntas! -1? 'Finalizar' : 'Siguiente'
    }
  }

  agregarRespuesta(){
    
    clearInterval(this.setInterval)

    this.crearObjetoRespuesta()

    if(this.indicePregunta === this.cuestionario?.cantidadPreguntas! -1){
      //! -----
      this.guardamosRespuestasCuestionario()
      return
    }
    this.indicePregunta ++
    this.respuestaAceptada = false
    this.respuestaSeleccionada = undefined
    this.indiceRespuesta = undefined
    this.btnText = 'Aceptar'
    this.iniciarContador()
  }

  crearObjetoRespuesta(){
    const respuestaUsuario: any = {
      titulo: this.cuestionario?.listPreguntas[this.indicePregunta].titulo,
      puntosObtenidos: this.obtenerPuntosPregunta(),
      segundos: this.calcularSegundos(),
      indexRespuestaSeleccionada: this.obtenerIndiceRespuestaSeleccionada(),
      listRespuestas: this.cuestionario?.listPreguntas[this.indicePregunta].listRespuestas
    }
    this.listRespuestasUsuario.push(respuestaUsuario)

    if(this.respuestaSeleccionada === undefined){
      this.cantidadIncorrectas ++
      return
    } 
    if(this.respuestaSeleccionada.esCorrecta){
      this.cantidadCorrectas ++
    } else{
      this.cantidadIncorrectas ++
    }

  }


  obtenerPuntosPregunta(): number{

    const puntos = this.cuestionario?.listPreguntas[this.indicePregunta].puntos
    if(!this.respuestaSeleccionada || !this.respuestaSeleccionada.esCorrecta){
      return 0
    } else {
      this.puntosTotales += puntos!
      return puntos!
    }
  }

  calcularSegundos(): string {
    if(this.respuestaSeleccionada){
      return (this.cuestionario?.listPreguntas[this.indicePregunta].segundos! - this.segundos).toString()
    } else{
      return 'No respondido'
    }
  }

  obtenerIndiceRespuestaSeleccionada(){
    if(this.respuestaSeleccionada){
      return this.indiceRespuesta
    } else {
      return ''
    }
  }

  guardamosRespuestasCuestionario(){
    const respuestaCuestionario: any = {
      idCuestionario: this.cuestionario?.id,
      nombreParticipante: this.nombre,
      fecha: new Date(),
      cantidadPreguntas: this.cuestionario?.cantidadPreguntas,
      cantidadCorrectas: this.cantidadCorrectas,
      cantidadIncorrectas: this.cantidadIncorrectas,
      puntosTotales: this.puntosTotales,
      listRespuestas: this.listRespuestasUsuario
    }

    this.loading = true
    
    this.respuestaQuizz.setRespuestaUsuario(respuestaCuestionario).then((data) => {
      this.router.navigate(['/jugar/respuesta-usuario', data.id])
    }).catch((error) => {
      console.log('Ha habido un error', error)
      this.router.navigate(['/'])
    })
    

  }

}
