import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;
  spinner: boolean = false

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private router: Router, private toastr: ToastrService, private _errorService: ErrorService){

    this.registerForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['']
    }, { validator: this.checkPassword}
    )
  }

  ngOnInit(): void {
  }


  register(){
    const usuario = this.registerForm.controls['usuario'].value
    const password = this.registerForm.get('password')?.value
    this.spinner = true

    this.afAuth.createUserWithEmailAndPassword(usuario, password).then(rta => {
      rta.user?.sendEmailVerification()
      this.toastr.success('Enviamos un email para verificar su cuenta!', 'Usuario registrado')
      this.router.navigate(['/usuario'])
    }).catch(error => {
      this.registerForm.reset()
      this.spinner = false
      this.toastr.error(this._errorService.error(error.code), 'Error')
    })
  }


  checkPassword(group: FormGroup): null | {} {
    const pass = group.controls['password'].value
    const repeatPass = group.controls['repeatPassword'].value
    return pass === repeatPass? null : { notSame: true}
  }

}
