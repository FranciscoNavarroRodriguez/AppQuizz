import { Pregunta } from "./Pregunta";

export class Cuestionario{

    id?: string;
    uid: string;
    titulo: string;
    descripcion: string;
    codigo: string;
    cantidadPreguntas: number;
    fechaCreacion: Date
    listPreguntas: Pregunta[];

    constructor(uid: string, titulo:string, descripcion: string, codigo: string, cantidadPreguntas: number, fechaCreacion: Date, listPreguntas: Pregunta[]){

        this.uid = uid,
        this.titulo = titulo,
        this.descripcion = descripcion,
        this.codigo = codigo,
        this.cantidadPreguntas = cantidadPreguntas
        this.fechaCreacion = fechaCreacion
        this.listPreguntas = listPreguntas  
    }

}