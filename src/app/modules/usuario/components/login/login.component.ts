import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/User';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario: FormGroup;
  spinner: boolean = false
  

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private _errorService: ErrorService, private toastr: ToastrService, private router: Router){

    this.formulario = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  login(){
    
    const usuario = this.formulario.get('usuario')?.value
    const password = this.formulario.get('password')?.value
    this.spinner = true

    this.afAuth.signInWithEmailAndPassword(usuario, password).then((rta) => {
      this.spinner = false
      if(rta.user?.emailVerified){
        this.setLocalStorage(rta.user)
        this.router.navigate(['/dashboard'])
      } else {
        this.router.navigate(['usuario/verificar-correo'])
      }

    }).catch(error => {
      this.formulario.reset();
      this.spinner = false
      this.toastr.error(this._errorService.error(error.code), 'Error')
    })

  }

  setLocalStorage(user: any): void {
    const usuario: User = {
      uid: user.uid,
      email: user.email
    }
    localStorage.setItem('user', JSON.stringify(usuario))
  }


}
