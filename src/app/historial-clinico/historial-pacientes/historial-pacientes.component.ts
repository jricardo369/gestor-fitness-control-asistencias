import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from './../../services/util.service';
import { DialogoHistorialComponent } from './../dialogo-historial/dialogo-historial.component';
import { Paciente } from './../../../model/paciente';
import { PacientesService } from './../../services/pacientes.service';
import { HistorialesService } from './../../services/historiales.service';
import { Historial } from './../../../model/historial';
import { ReportesService } from './../../services/reportes.service';
import { Usuario } from './../../../model/usuario';

@Component({
  selector: 'app-historial-pacientes',
  templateUrl: './historial-pacientes.component.html',
  styleUrls: ['./historial-pacientes.component.scss']
})
export class HistorialPacientesComponent implements OnInit {

	cargando: boolean = false;
	esPaciente: boolean = false;
	titulo: string = "";
	pacientes: Paciente[] = [];
	paciente: Paciente = new Paciente();

	historiales: Historial[] = [];
	historiaClinica: Historial = new Historial();

	fechaInicio: string = "";
	fechaFin: string = "";
	
	constructor(
		private historialesService: HistorialesService,
		private pacientesService: PacientesService,
		private reportesService: ReportesService,
        activatedRoute: ActivatedRoute,
		private router: Router,
		public utilService: UtilService,
        private dialog: MatDialog) { 
			this.fechaInicio = this.dateAsYYYYMMDD(this.obtenerPrimerDiaDeSemana(new Date(Date.now()), 0));
			this.fechaFin = this.dateAsYYYYMMDD(this.obtenerUltimoDiaDeSemana(new Date(Date.now()), 6));

			//if (activatedRoute.routeConfig.path == 'historial-pacientes') {
				this.esPaciente = false;
				this.titulo = "Historial de pacientes"
				this.obtenerPacientes();
			/*}
			else if (activatedRoute.routeConfig.path == 'mi-historial') {
				this.esPaciente = true;
				this.titulo = "Mi historial";
				this.obtenerPaciente();
			}*/
		}

	ngOnInit(): void {
	}

	obtenerPacientes() {
		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'))
        this.cargando = true;
        this.pacientesService
            .obtenerPacientes(usuario.sociedad.sociedad)
            .then(pacientes => {
				this.pacientes = pacientes;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	obtenerPaciente() {
		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'));
        this.cargando = true;
        this.pacientesService
            .obtenerPaciente((usuario.paciente))
            .then(paciente => {
				this.paciente = paciente;
				console.log(this.paciente)
				this.refrescar();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	refrescar() {
		this.cargando = true;
        this.historialesService
            .obtenerHistorialesDePacientePorFechas(this.paciente.idCliente, this.fechaInicio, this.fechaFin)
            .then(historiales => {
				this.historiales = historiales;
				// console.log(historiales)
				this.historiaClinica = this.historiales.find(e => e.tipo.idTipoHistorial == 3);
				if (!this.historiaClinica) {
					this.historiaClinica = new Historial();
					// console.log(this.historiaClinica)
				}
				this.historiales = this.historiales.map(e => e).filter(e => e.tipo.idTipoHistorial !== 3);
				console.log(this.historiales)
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
	}

	altaHistorial() {
		this.dialog.open(DialogoHistorialComponent, {
            data: {},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') {
				if(this.paciente && this.paciente.idCliente) this.refrescar();
			}
        }).catch(reason => this.utilService.manejarError(reason));
	}

	abrirHistorial(idHistorial: number) {
		this.dialog.open(DialogoHistorialComponent, {
            data: {
				idHistorial: idHistorial,
				esPaciente: this.esPaciente
			},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'editado') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

	descargarPdf() {
		this.reportesService
			.obtenerPdfHistoriales(this.paciente.idCliente)
			.subscribe(
				data => {
				const file = new Blob([data], { type: 'application/pdf' });
				const fileURL = URL.createObjectURL(file);
				window.open(fileURL);
				}
			);
	}


	obtenerPrimerDiaDeSemana(hoy: Date, primerDia: number): Date {
		while (hoy.getDay() !== primerDia) {
			hoy.setDate(hoy.getDate() - 1);
		}
		return hoy;
	}

	obtenerUltimoDiaDeSemana(hoy: Date, ultimoDia: number): Date {
		while (hoy.getDay() !== ultimoDia) {
			hoy.setDate(hoy.getDate() + 1);
		}
		return hoy;
	}

	dateAsYYYYMMDD(date: Date): string {
		return '' + date.getFullYear() + '-' + this.withLeadingZeros((date.getMonth() + 1), 2) + '-' + this.withLeadingZeros((date.getDate()), 2);
	}

	withLeadingZeros(integer: number, digits: number): string {
		let n = '' + Number.parseInt('' + integer);
		for (let i = n.length; i < digits; i++) n = '0' + n;
		return n;
	}

	dateAsDDMMYYYY(date: string): string {
		var splitted = date.split('-'); 
		return '' + splitted[2] + '/' + splitted[1] + '/' + splitted[0];
	}

}
