import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }


  error(code: string): string{

    switch(code) {
      case 'auth/email-already-in-use':
        return 'El email ya está en uso'
      case 'auth/invalid-email':
        return 'Formato de email incorrecto'
      case 'auth/weak-password':
        return 'La contraseña es muy debil'
      case 'auth/user-not-found':
        return 'Usuario inválido'
      case 'auth/wrong-password':
        return 'Contraseña inválida'
      default:
        return 'Error desconocido'
    }
  }

}
