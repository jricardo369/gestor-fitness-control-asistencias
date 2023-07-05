import { Permiso } from "./permiso";
import { Sociedad } from "./sociedad";

export class Usuario {
    ciudad: string;
    contrasenia: string;
    correoElectronico: string;
    direccion: string;
    edad: number;
    estatus: string;
    fechaCreacion: string;
    idUsuario: number;
    intentos: number;
    nombre: string;
    paciente: number;
    permisos: Permiso[];
    rol: string;
    sexo: string;
    sociedad: Sociedad;
    telefono: string;
    usuario: string;
}
