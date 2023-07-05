import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsistenciasAClaseService } from 'src/app/services/asistenciasAClases.service';
import { ClaseService } from 'src/app/services/clases.service';
import { UtilService } from 'src/app/services/util.service';
import { DialogoAsistenciaAClasesComponent } from '../dialogo-cita/dialogo-asistencia-a-clase.component';
import { AsistenciaAClase } from './../../../model/asistenciaAClase';
import { ClaseG } from './../../../model/clase';
import { Usuario } from './../../../model/usuario';

export class Semana {
	lunes: AsistenciaAClase[];
	martes: AsistenciaAClase[];
	miercoles: AsistenciaAClase[];
	jueves: AsistenciaAClase[];
	viernes: AsistenciaAClase[];
	sabado: AsistenciaAClase[];
	domingo: AsistenciaAClase[];
}

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

	cargando: boolean = false;
	asistenciaAClase: AsistenciaAClase = new AsistenciaAClase();
	clases: ClaseG[] = [];
	

	// fecha0: string = "";
	fecha: string = "";
	asitenciasAClases: Semana = new Semana();
	// citasLunes: Cita[] = [];
	// citasMartes: Cita[] = [];
	// citasMiercoles: Cita[] = [];
	// citasJueves: Cita[] = [];
	// citasViernes: Cita[] = [];
	// citasSabado: Cita[] = [];
	// citasDomingo: Cita[] = [];
	
	constructor(
		private clasesService: ClaseService,
		private asitenciasAClase: AsistenciasAClaseService,
		private router: Router,
		public utilService: UtilService,
        private dialog: MatDialog) {
			this.fecha = this.dateAsYYYYMMDD(new Date(Date.now()));
			// this.fecha0 = this.dateAsYYYYMMDD(this.obtenerPrimerDiaDeSemana(new Date(this.fecha)));
			this.refrescar();
			this.obtenerClases();
	}

	ngOnInit(): void {
	}

	refrescar() {
		this.cargando = true;
        this.asitenciasAClase
            .obtenerAsistenciaAClases(1,this.fecha)
            .then(asistenciaAClase => {
				console.log("asisteciasAclases:"+asistenciaAClase);
				// this.citas = citas;
				this.organizarCitasDeSemana(
					this.obtenerPrimerDiaDeSemana(new Date(this.fecha)),
					asistenciaAClase
				);
				console.log(this.asitenciasAClases);
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
	}

	organizarCitasDeSemana(inicio: Date, asitenciasAClase: AsistenciaAClase[]) {
		while (inicio.getDay() <= 6) {

			let fecha = this.dateAsYYYYMMDD(inicio);
			 console.log(fecha)

			switch (inicio.getDay()) {
				case 0:
					this.asitenciasAClases.domingo = asitenciasAClase.filter(cita => cita.fecha.split(' ')[0] == fecha) as AsistenciaAClase[];
					break;
				case 1:
					this.asitenciasAClases.lunes = asitenciasAClase.filter(cita => cita.fecha.split(' ')[0] == fecha) as AsistenciaAClase[];
					break;
				case 2:
					this.asitenciasAClases.martes = asitenciasAClase.filter(cita => cita.fecha.split(' ')[0] == fecha) as AsistenciaAClase[];
					break;
				case 3:
					this.asitenciasAClases.miercoles = asitenciasAClase.filter(cita => cita.fecha.split(' ')[0] == fecha) as AsistenciaAClase[];
					break;
				case 4:
					this.asitenciasAClases.jueves = asitenciasAClase.filter(cita => cita.fecha.split(' ')[0] == fecha) as AsistenciaAClase[];
					break;
				case 5:
					this.asitenciasAClases.viernes = asitenciasAClase.filter(cita => cita.fecha.split(' ')[0] == fecha) as AsistenciaAClase[];
					break;
				case 6:
					this.asitenciasAClases.sabado = asitenciasAClase.filter(cita => cita.fecha.split(' ')[0] == fecha) as AsistenciaAClase[];
					break;
				default:
					break;
			}

			if (inicio.getDay() == 6) break;
			inicio.setDate(inicio.getDate() + 1);
		}
	}

	obtenerPrimerDiaDeSemana(fecha: Date): Date {
		while (fecha.getDay() !== 0) {
			fecha.setDate(fecha.getDate() - 1);
		}
		console.log('fecha de primer dia de la semana:'+fecha)
		return fecha;
	}

	dateAsYYYYMMDD(date: Date): string {
		return '' + date.getFullYear() + '-' + this.withLeadingZeros((date.getMonth() + 1), 2) + '-' + this.withLeadingZeros((date.getDate()), 2);
	}

	withLeadingZeros(integer: number, digits: number): string {
		let n = '' + Number.parseInt('' + integer);
		for (let i = n.length; i < digits; i++) n = '0' + n;
		return n;
	}

	mostrarHoraDeCita(horaInicio: string = '', horaFin: string = ''): string {
		let arrayHI: string[] = horaInicio.split(':');
		let arrayHF: string[] = horaFin.split(':');
		
		return ((parseInt(arrayHI[0]) + 11) % 12 + 1).toString() + ':' + arrayHI[1] + (parseInt(arrayHI[0]) < 12 ? 'am' : 'pm') + ' a ' + ((parseInt(arrayHF[0]) + 11) % 12 + 1).toString() + ':' + arrayHF[1] + (parseInt(arrayHF[0]) < 12 ? 'am' : 'pm');
	}

	usuariosDeClase(usuarios: Usuario[]){
		return "Asistencias:"+usuarios.length;
	}

	// dateAsDDMMYYYY(date: string): string {
	// 	var splitted = date.split('-'); 
	// 	return '' + splitted[2] + '/' + splitted[1] + '/' + splitted[0];
	// }






	crearAsistenciaAClase() {
		this.dialog.open(DialogoAsistenciaAClasesComponent, {
            data: {},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

	abrirCita(asistenciaClase: AsistenciaAClase) {
		this.dialog.open(DialogoAsistenciaAClasesComponent, {
            data: {
				asistenciasClase: asistenciaClase
			},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'editado') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

	obtenerClases(){
		this.cargando = true;
        this.clasesService
            .obtenerClases()
            .then(clases => {
				this.clases = clases;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

}
