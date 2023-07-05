import { Paciente } from './paciente';
import { Usuario } from './usuario';

export class Cita {
    comentario: string;
    fecha: string;
    idCita: number;
    horaInicio: string;
    horaFin: string;
    paciente: Paciente;
    usuario: Usuario;
}