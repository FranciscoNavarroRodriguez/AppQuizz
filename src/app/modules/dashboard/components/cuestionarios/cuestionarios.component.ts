import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cuestionario } from 'src/app/models/Cuestionario';
import { Pregunta } from 'src/app/models/Pregunta';
import { QuizzService } from 'src/app/services/quizz.service';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.scss']
})
export class CuestionariosComponent implements OnInit, OnDestroy{

  suscripcion: Subscription = new Subscription()
  suscripcionQuizz: Subscription = new Subscription()
  listCuestionarios: Cuestionario[] = []
  spinner: boolean = false

  constructor(private afAuth: AngularFireAuth, private router: Router, private _quizzService: QuizzService, private toastr: ToastrService){}

  ngOnInit(): void {
    this.spinner = true
    this.suscripcion = this.afAuth.user.subscribe({
      next: (user) => {
        if(user && user.emailVerified){
          //Cargamos los cuestionarios
          this.suscripcionQuizz = this._quizzService.getCuestionarioByIdUser(user.uid).subscribe({
            next: (value) => {
              this.listCuestionarios = []
              this.spinner = false
              value.forEach((element: any) => {
                this.listCuestionarios.push({
                  id: element.payload.doc.id,
                  ...element.payload.doc.data()
                })
              });
            },
            error: (error) =>{
              console.log(error)
              this.spinner = false
            }
          })
        } else {
          this.router.navigate(['/usuario'])
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
    this.suscripcionQuizz.unsubscribe();
  }

  eliminarCuestionario(id: string){
    this.spinner = true
    this._quizzService.deleteCuestionario(id).then((value) => {
      this.spinner = false
      this.toastr.info('El cuestionario fue eliminado con exito!', 'Cuestionario eliminado')
    }).catch(() => {
      this.spinner = false
      this.toastr.error('Ha habido un error al eliminar el cuestionario', 'Error')
    })
  }

}