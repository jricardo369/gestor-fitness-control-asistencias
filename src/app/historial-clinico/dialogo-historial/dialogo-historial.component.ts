import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { Paciente } from './../../../model/paciente';
import { Usuario } from './../../../model/usuario';
import { Historial } from './../../../model/historial';
import { PacientesService } from 'src/app/services/pacientes.service';
import { HistorialesService } from './../../services/historiales.service';
import { TipoHistorial } from '../../../model/tipoHistorial';
import { AdjuntosService } from './../../services/adjuntos.service';
import { Adjunto } from '../../../model/adjunto';

@Component({
  selector: 'app-dialogo-historial',
  templateUrl: './dialogo-historial.component.html',
  styleUrls: ['./dialogo-historial.component.scss']
})
export class DialogoHistorialComponent implements OnInit {

	baseHref = document.baseURI;
	
	cargando: boolean = false;
	creando: boolean = false;
	esPaciente: boolean = false;
	titulo: string = '';
	historial: Historial = new Historial();
	pacientes: Paciente[] = [];
	adjuntos: Adjunto[] = [];
	tiposHistoriales: TipoHistorial[] = [];

	public file: File[] = [];

	constructor(
		private historialesService: HistorialesService,
		private pacientesService: PacientesService,
		private adjuntosService: AdjuntosService,
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoHistorialComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			if (data.idHistorial) {
				this.titulo = "Historial"
				this.creando = false;
				this.historial.idHistorial = data.idHistorial;
				this.esPaciente = data.esPaciente;
			} else {
				this.titulo = "Alta Historial";
				this.creando = true;
			}

			this.ejecutarServicios();
		}

	ngOnInit(): void {
	}

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

	ejecutarServicios() {
		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'))
		let promises = [];
		promises.push(this.pacientesService.obtenerPacientes(usuario.sociedad.sociedad));
		promises.push(this.historialesService.obtenerTiposHistoriales());

		this.cargando = true;
		Promise
            .all(promises)
            .then(results => {
                console.log(results)
				this.pacientes = results[0];
				this.tiposHistoriales = results[1];
				if (!this.creando) this.refrescar();
            }).catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	refrescar() {
		this.cargando = true;
        this.historialesService
            .obtenerHistorialPorId(this.historial.idHistorial)
            .then(historial => {
				this.historial = historial;

				this.historial.fecha = this.historial.fecha.split(' ')[0];

				// console.log(this.pacientes);
				if (this.historial.paciente && this.historial.paciente.idCliente) this.historial.paciente = this.pacientes.find(e => e.idCliente == this.historial.paciente.idCliente);
				if (this.historial.tipo && this.historial.tipo.idTipoHistorial) this.historial.tipo = this.tiposHistoriales.find(e => e.idTipoHistorial == this.historial.tipo.idTipoHistorial);
				console.log(this.historial);
				this.obtenerAdjuntos();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
	}

	obtenerAdjuntos() {
        this.cargando = true;
        this.adjuntosService
            .obtenerAdjuntosDeHistorial(this.historial.idHistorial)
            .then(adjuntos => {
				this.adjuntos = adjuntos
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	abrirAdjunto(adjunto: Adjunto) {
		window.open(adjunto.ruta);
	}

	crear() {
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

        /*this.adjuntosService
            .insertarAdjunto(historial.idHistorial, this.file[0])
            .then(adjunto => {
				this.cerrar('creado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);*/
    }

	editar() {
		this.cargando = true;
        this.historialesService
            .editarHistorial(this.historial)
            .then(usuario => {
				this.cerrar('editado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	eliminar() {
		this.cargando = true;
        this.historialesService
            .eliminarHistorial(this.historial.idHistorial)
            .then(usuario => {
				this.cerrar('editado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	cerrar(accion: string = "") { this.dialogRef.close(accion); }

}
