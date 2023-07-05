import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoSimpleComponent } from 'src/app/common/dialogo-simple/dialogo-simple.component';
import { PacientesService } from 'src/app/services/pacientes.service';
import { UtilService } from 'src/app/services/util.service';
import { Paciente } from 'src/model/paciente';
import { HistorialesService } from './../../services/historiales.service';
import { Historial } from './../../../model/historial';
import { AdjuntosService } from './../../services/adjuntos.service';

@Component({
  selector: 'app-dialogo-paciente',
  templateUrl: './dialogo-paciente.component.html',
  styleUrls: ['./dialogo-paciente.component.scss']
})
export class DialogoPacienteComponent implements OnInit {

	cargando: boolean = false;
	creando: boolean = false;
	odontograma: boolean = false;
	titulo: string = '';
	pacientes: Paciente[] = [];
	paciente: Paciente = new Paciente();
	historial: Historial = new Historial();

	public file: File[] = [];
	usuario: string = "";

	constructor(
		private pacientesService: PacientesService,
		private historialesService: HistorialesService,
		private adjuntosService: AdjuntosService,
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoPacienteComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			console.log('datos:'+data);
			if (data.idCliente) {
				this.titulo = "Editar Cliente"
				this.paciente.idCliente = data.idCliente;
				this.refrescar();
				this.creando = false;
			} else {
				this.titulo = "Crear Cliente";
				this.creando = true;
			}
		}

	ngOnInit(): void {
	}

	refrescar() {
        this.cargando = true;
        this.pacientesService
            .obtenerPaciente(this.paciente.idCliente)
            .then(paciente => {
                this.paciente = paciente;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	crear() {
		this.paciente.sociedad = { sociedad: 1, nombre: "", fechaCreacion: "", estatus: true };
		
		this.cargando = true;
        this.pacientesService
            .insertarPaciente(this.paciente)
            .then(paciente => {
				console.log(paciente)
				if (this.odontograma) this.crearHistorial(paciente);
				else this.cerrar('creado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	crearHistorial(paciente: Paciente) {
		this.historial.fecha = this.dateAsYYYYMMDD(new Date(Date.now()));;
		this.historial.paciente = paciente;
		this.historial.tipo = { idTipoHistorial: 1, descripcion: "odontograma" };

        this.cargando = true;
        this.historialesService
            .insertarHistorial(this.historial)
            .then(historial => {
				if (this.file!=null) this.agregarAdjunto(historial);
				else this.cerrar('creado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	agregarAdjunto(historial: Historial) {
		let promises = [];
		this.file.forEach(f => promises.push(this.adjuntosService.insertarAdjunto(historial.idHistorial, f)));

        this.cargando = true;
		Promise
            .all(promises)
            .then(results => {
                console.log(results);
				this.cerrar('creado');
            }).catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	dateAsYYYYMMDD(date: Date): string {
		return '' + date.getFullYear() + '-' + this.withLeadingZeros((date.getMonth() + 1), 2) + '-' + this.withLeadingZeros((date.getDate()), 2);
	}

	withLeadingZeros(integer: number, digits: number): string {
		let n = '' + Number.parseInt('' + integer);
		for (let i = n.length; i < digits; i++) n = '0' + n;
		return n;
	}

	editar() {
		this.cargando = true;
        this.pacientesService
            .editarPaciente(this.paciente)
            .then(paciente => {
				this.cerrar('editando');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	eliminar() {
		this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar cliente',
                texto: 'Está a punto de eliminar el cliente con id: ' + this.paciente.idCliente + '. Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar cliente', color: 'primary', valor: 'eliminar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'eliminar') {
                this.cargando = true;
				this.pacientesService
					.eliminarPaciente(this.paciente.idCliente)
					.then(paciente => {
						this.cerrar('editando');
					})
					.catch(reason => this.utilService.manejarError(reason))
					.then(() => this.cargando = false);
            }
        }).catch(reason => this.utilService.manejarError(reason));
	}

	cerrar(accion: string = "") { this.dialogRef.close(accion); }

	onFileSelected(files: FileList) { 
        // this.file[0] = files.length && files.item(0).type.startsWith('image/') ? files.item(0) : null;
		for (let i = 0; i < files.length; i++) {
			if(files.item(i).type.startsWith('image/')) this.file.push(files.item(i));
		}
    }

	quitarAdjunto(archivo: File) {
		let start = this.file.findIndex(f => f == archivo);
        this.file.splice(start, 1);
	}

}
