import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { Cuestionario } from '../models/Cuestionario';
import { Pregunta } from '../models/Pregunta';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  tituloCuestionario: string = ''
  descripcion: string = ''

  pregunta$: Subject<Pregunta> = new Subject()

  constructor(private _firestore: AngularFirestore) { }

  setPregunta(pregunta: Pregunta){
    this.pregunta$.next(pregunta)
  }

  getPregunta(): Observable<Pregunta>{
    return this.pregunta$.asObservable()
  }

  crearCuestionario(cuestionario: Cuestionario): Promise<any>{
    return this._firestore.collection('cuestionarios').add(cuestionario)
  }

  getCuestionarioByIdUser(userId: string): Observable<any>{
    return this._firestore.collection('cuestionarios', ref => ref.where('uid', '==', userId )).snapshotChanges()
  }

  deleteCuestionario(id: string): Promise<any>{
    return this._firestore.collection('cuestionarios').doc(id).delete();
  }

  getCuestionario(id: string): Observable<any>{
    return this._firestore.collection('cuestionarios').doc(id).get();
  }

}
