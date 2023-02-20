import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-crear-quizz',
  templateUrl: './crear-quizz.component.html',
  styleUrls: ['./crear-quizz.component.scss']
})
export class CrearQuizzComponent {

  cuestionarioForm: FormGroup;
  mostrarError: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private quizzService: QuizzService){

    this.cuestionarioForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    })

  }

  siguiente(){

    if(this.cuestionarioForm.invalid){
      this.mostrarError = true
      setTimeout(() => {
        this.mostrarError = false
      }, 3000);
    } else {
      this.quizzService.tituloCuestionario = this.cuestionarioForm.get('titulo')?.value
      this.quizzService.descripcion = this.cuestionarioForm.get('descripcion')?.value
      this.router.navigate(['/dashboard/crear-preguntas'])
    }
  }
}
