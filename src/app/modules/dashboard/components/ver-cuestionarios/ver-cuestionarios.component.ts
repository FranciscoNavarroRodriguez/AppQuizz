import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-ver-cuestionarios',
  templateUrl: './ver-cuestionarios.component.html',
  styleUrls: ['./ver-cuestionarios.component.scss']
})
export class VerCuestionariosComponent implements OnInit{

  id: string;
  cuestionario: Cuestionario | undefined
  spinner: boolean = false

  constructor(private _quizzService: QuizzService, private route: ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id') || ''
  }


  ngOnInit(): void {
    this.obtenerCuestionario()
  }

  obtenerCuestionario(){
    this.spinner = true
    this._quizzService.getCuestionario(this.id).subscribe({
      next: (value) => {
        this.cuestionario = value.data()
        this.spinner = false
      }, error: (error) => {
        console.log(error)
        this.spinner = false
      }
    })
  }

}
