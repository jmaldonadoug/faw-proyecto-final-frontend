export class Tarea {
    idtarea: number;
    titulo: string;
    descripcion: string;
    prioridad: string;
    fecha_creacion: string;
    estado: string;
    idusuario: number;

    constructor(idtarea: number, titulo: string, descripcion: string, prioridad: string, fecha_creacion: string, estado: string, idusuario: number) {
        this.idtarea = idtarea;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha_creacion = fecha_creacion;
        this.prioridad = prioridad;
        this.estado = estado;
        this.idusuario = idusuario;
    }
}

export class GetTareasResponse {
    data: Tarea[];

    constructor(data: Tarea[]) {
        this.data = data;
    }
}

export class TareaResponse {
    data: Tarea[];
    message: string;

    constructor(data: Tarea[], message: string) {
        this.data = data;
        this.message = message;
    }
}
