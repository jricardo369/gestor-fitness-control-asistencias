import { Sociedad } from "./sociedad";

export class Paciente {
    idCliente: number;
    nombre: string;
    domicilioFiscal: string;
    razonSocial: string;
    colonia: string;
    cp: string;
    entreCalles: number;
    ciudad: string;
    municipio: string;
    estado: string;
    telefono: string;
    correoElectronico: Sociedad;
    estatus: number;
    actividadComercial: string;
    fechaModificacion: string;
    fechaCreacion: string;
    sociedad: Sociedad;
}