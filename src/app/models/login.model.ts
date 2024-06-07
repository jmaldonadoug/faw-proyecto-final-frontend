export class LoginResponse {
    message: string;
    token: string;
    usuario: Usuario;

    constructor(message: string, token: string, usuario: Usuario) {
        this.message = message;
        this.token = token;
        this.usuario = usuario;
    }
}

export class Usuario {
    idusuario: number;
    nombre: string;
    email: string;
    fecha_nacimiento: string;
    clave: string;
    genero: string;

    constructor(idusuario: number, nombre: string, email: string, fecha_nacimiento: string, clave: string, genero: string) {
        this.idusuario = idusuario;
        this.nombre = nombre;
        this.email = email;
        this.fecha_nacimiento = fecha_nacimiento;
        this.clave = clave;
        this.genero = genero;
    }
}