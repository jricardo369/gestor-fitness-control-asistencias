import { Usuario } from './usuario';
import { TipoPago } from './tipoPago';

export class Pago {
    idMovimiento: number;
    fecha: string;
    monto: number;
    usuario: Usuario;
    tipoMovimiento: TipoPago;
    descripcion: string;
}