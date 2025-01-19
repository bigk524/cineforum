export class Usuario {
    id!: number;
    nombre: string = '';
    email: string = '';
    clave: string = '';
    descripcion: string = '';
    banneado: boolean = false;
    rol = 2;
    foto!: any;
}
