import { Respuesta } from "./Respuesta";

export class Pregunta{

    titulo: string;
    segundos: number;
    puntos: number;
    listRespuestas: Respuesta[];

    constructor(titulo: string, segundos: number, puntos: number, listRespuestas: Respuesta[]){

        this.titulo = titulo,
        this.segundos = segundos,
        this.puntos = puntos,
        this.listRespuestas = listRespuestas
    }


}