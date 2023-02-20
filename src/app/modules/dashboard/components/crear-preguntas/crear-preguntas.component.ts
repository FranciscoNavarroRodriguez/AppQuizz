import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pregunta } from 'src/app/models/Pregunta';
import { Respuesta } from 'src/app/models/Respuesta';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.scss']
})
export class CrearPreguntasComponent implements OnInit{

  preguntaForm: FormGroup;
  mostrarError: boolean = false

  constructor(private _quizzService: QuizzService, private fb: FormBuilder){
    this.preguntaForm = this.fb.group({
      titulo: ['', Validators.required],
      segundos: [10, Validators.required],
      puntos: [1200, Validators.required],
      respuesta1: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta2: this.fb.group({
        titulo: ['', Validators.required],
        esCorrecta: [false, Validators.required]
      }),
      respuesta3: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
      respuesta4: this.fb.group({
        titulo: '',
        esCorrecta: false
      }),
    })
  }


  ngOnInit(): void {
  }

  agregarPregunta(): void{
    if(this.preguntaForm.invalid || this.todasIncorrectas()){
      this.error()
      return
    }
    
    let listRespuestas: Respuesta[] = []
    this.obtenerRespuestas(listRespuestas)
    const titulo = this.preguntaForm.get('titulo')?.value
    const segundos = this.preguntaForm.get('segundos')?.value
    const puntos = this.preguntaForm.get('puntos')?.value

    const pregunta: Pregunta = {
      titulo,
      segundos,
      puntos,
      listRespuestas
    }
    this._quizzService.setPregunta(pregunta)
    this.reset()
  }

  reset(){
    this.preguntaForm.patchValue({
      titulo: '',
      segundos: 10,
      puntos: 1200,
      respuesta1: { titulo: '', esCorrecta: false},
      respuesta2: { titulo: '', esCorrecta: false},
      respuesta3: { titulo: '', esCorrecta: false},
      respuesta4: { titulo: '', esCorrecta: false}
    })
  }

  todasIncorrectas(): boolean{
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4']
    
    for(let respuesta of array){
      if(this.preguntaForm.get(respuesta)?.value.esCorrecta){
        return false
      }
    }

    return true
  }

  error(): void{
    this.mostrarError = true
      setTimeout(() => {
        this.mostrarError = false
      }, 3000);
  }

  get seg(): number{
    return this.preguntaForm.get('segundos')?.value
  }

  get puntos(): number{
    return this.preguntaForm.get('puntos')?.value
  }

  obtenerEsCorrecta(respuesta: string): boolean{
    return this.preguntaForm.get(respuesta)?.value.esCorrecta
  }

  sumarRestarSeg(numero: number): void {
    if(this.seg === 5 && numero === -1){
      return
    }
    this.preguntaForm.patchValue({
      segundos: this.seg + numero
    })
  }

  esCorrecta(pregunta: string): void{
    this.preguntaForm.get(pregunta)!.patchValue({
      esCorrecta: !this.preguntaForm.get(pregunta)!.value.esCorrecta
    })
    this.setFalseRespuestas(pregunta)
  }

  setFalseRespuestas(respuesta: string): void{
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4']

    array.forEach(element => {
      element != respuesta ? this.preguntaForm.get(element)?.patchValue({esCorrecta: false}) : ''
    });
  }

  obtenerRespuestas(listRespuestas: Respuesta[]){
    const array = ['respuesta1', 'respuesta2', 'respuesta3', 'respuesta4']

    array.forEach(element => {
      let rtaTitulo = this.preguntaForm.get(element)?.value.titulo
      let esCorrecta = this.preguntaForm.get(element)?.value.esCorrecta
      let respuesta: Respuesta = { titulo : rtaTitulo, esCorrecta: esCorrecta}
      if(rtaTitulo){
        listRespuestas.push(respuesta)
      }
    });
    
  }

}
