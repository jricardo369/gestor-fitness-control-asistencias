import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { PaginationManager } from 'src/util/pagination';
import { DialogoPagoComponent } from './../dialogo-pago/dialogo-pago.component';
import { Pago } from './../../../model/pago';
import { PagosService } from './../../services/pagos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ReportesService } from './../../services/reportes.service';
import { ReporteMovimiento } from './../../../model/reporteMovimiento';
import { Usuario } from './../../../model/usuario';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

	cargando: boolean = false;
	esPaciente: boolean = false;
	titulo: string = "";
	usuarios: Usuario[] = [];
	usuario: Usuario = new Usuario();
	reporteMovimiento: ReporteMovimiento = {saldo: 0, totalAdeudos: 0, totalIngreso: 0};

	pagos: Pago[] = [];

	fechaInicio: string = "";
	fechaFin: string = "";

	paginacion: PaginationManager = new PaginationManager();

	constructor(
		private pagosService: PagosService,
		private usuariosService: UsuariosService,
		private reportesService: ReportesService,
        activatedRoute: ActivatedRoute,
		private router: Router,
		public utilService: UtilService,
        private dialog: MatDialog) {
			this.fechaInicio = this.dateAsYYYYMMDD(this.obtenerPrimerDiaDeSemana(new Date(Date.now()), 0));
			this.fechaFin = this.dateAsYYYYMMDD(this.obtenerUltimoDiaDeSemana(new Date(Date.now()), 6));

			if (activatedRoute.routeConfig.path == 'pagos') {
				this.esPaciente = false;
				this.titulo = "Pagos";
				this.obtenerUsuarios();
			}
			else if (activatedRoute.routeConfig.path == 'mis-pagos') {
				this.esPaciente = false;
				this.titulo = "Pagos";
				this.obtenerUsuarios();
			}
		}

	ngOnInit(): void {
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

	obtenerUsuarios() {
        this.cargando = true;
        this.usuariosService
            .obtenerUsuarios()
            .then(usuarios => {
				this.usuarios = usuarios;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	obtenerUsuario() {
		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'));
        this.cargando = true;
        this.usuariosService
            .obtenerUsuarioPorId((usuario.idUsuario))
            .then(usuario => {
				this.usuario = usuario;
				console.log(usuario);
				//this.refrescar();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }


	obtenerReporte() {
        this.cargando = true;
		if(!this.switchCase){
			this.reportesService
            .obtenerReporteTotalDeMovimientosDePaciente(this.usuario.idUsuario,this.fechaInicio, this.fechaFin)
            .then(reporteMovimiento => {
				this.reporteMovimiento = reporteMovimiento;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
		}else{
			this.reportesService
            .obtenerReporteTotalDeMovimientosPorFecha(this.fechaInicio, this.fechaFin)
            .then(reporteMovimiento => {
				this.reporteMovimiento = reporteMovimiento;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
		}
       
    }

	refrescar() {

		this.cargando = true;
		if(!this.switchCase){
			this.pagosService
            .obtenerMovimientosDePacientePorFecha(this.usuario.idUsuario, this.fechaInicio, this.fechaFin)
            .then(pagos => {
				this.pagos = pagos;
				this.paginacion.setArray(this.pagos);
				console.log(this.pagos)
				this.obtenerReporte();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
		}else{
			this.pagosService
            .obtenerMovimientosPorFecha(this.fechaInicio, this.fechaFin)
            .then(pagos => {
				this.pagos = pagos;
				this.paginacion.setArray(this.pagos);
				console.log(this.pagos)
				this.obtenerReporte();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
		}
        
	}

	crearPago() {
		this.dialog.open(DialogoPagoComponent, {
            data: {},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') { if(this.usuario && this.usuario.idUsuario)  this.refrescar(); }
        }).catch(reason => this.utilService.manejarError(reason));
	}

	abrirPago(idMovimiento: number) {
		this.dialog.open(DialogoPagoComponent, {
            data: {
				idMovimiento: idMovimiento,
				esPaciente: this.esPaciente
			},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'editado') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

	descargarPdfGeneral() {
		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'));
		this.reportesService
			.obtenerPdfPagosGeneral(this.fechaInicio, this.fechaFin, usuario.sociedad.sociedad)
			.subscribe(
				data => {
				const file = new Blob([data], { type: 'application/pdf' });
				const fileURL = URL.createObjectURL(file);
				window.open(fileURL);
				}
			);
	}

	descargarPdfPaciente() {
		this.reportesService
			.obtenerPdfPagosPaciente(this.usuario.idUsuario,this.fechaInicio, this.fechaFin)
			.subscribe(
				data => {
				const file = new Blob([data], { type: 'application/pdf' });
				const fileURL = URL.createObjectURL(file);
				window.open(fileURL);
				}
			);
	}

	public switchCase: boolean = false;
  	toggleButton() {
    this.switchCase = !this.switchCase;
  	}

}
