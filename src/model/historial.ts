import { Paciente } from './paciente';
import { Usuario } from './usuario';
import { TipoHistorial } from './tipoHistorial';

export class Historial {
    idHistorial: number;
    descripcion: string;
    fecha: string;
    paciente: Paciente;
    usuario: Usuario;
    tipo: TipoHistorial;
}