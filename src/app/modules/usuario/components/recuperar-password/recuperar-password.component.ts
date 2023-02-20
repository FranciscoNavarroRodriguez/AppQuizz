import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent {

  recuperarForm: FormGroup
  spinner: boolean = false

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private _errorService: ErrorService, private toastr: ToastrService, private router: Router){
    this.recuperarForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]]    })
  }

  recuperarPassword(){
    const usuario = this.recuperarForm.get('usuario')?.value
    this.spinner = true

    this.afAuth.sendPasswordResetEmail(usuario).then(rta => {
      this.toastr.info('Enviamos un email para restablecer su password', 'Restablecer password')
      this.router.navigate(['/usuario']);
    }).catch(error => {
      console.log(error.code)
      this.spinner = false
      this.toastr.error(this._errorService.error(error.code), 'Error');
      this.recuperarForm.reset();
    })
  }

}
