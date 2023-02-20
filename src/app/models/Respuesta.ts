export class Respuesta {
    titulo: string
    esCorrecta: boolean

    constructor(titulo: string, esCorrecta: boolean){
        this.titulo = titulo
        this.esCorrecta = esCorrecta
    }
}