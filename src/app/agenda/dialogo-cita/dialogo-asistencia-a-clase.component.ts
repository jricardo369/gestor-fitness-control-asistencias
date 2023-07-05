import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaginationManager } from 'src/util/pagination';
import { CitasService } from 'src/app/services/citas.service';
import { AsistenciasAClaseService } from 'src/app/services/asistenciasAClases.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { UtilService } from 'src/app/services/util.service';
import { Paciente } from 'src/model/paciente';
import { AsistenciaAClase } from 'src/model/asistenciaAClase';
import { Usuario } from 'src/model/usuario';
import { Cita } from '../../../model/cita';

@Component({
  selector: 'app-dialogo-cita',
  templateUrl: './dialogo-asistencia-a-clase.component.html',
  styleUrls: ['./dialogo-asistencia-a-clase.component.css']
})
export class DialogoAsistenciaAClasesComponent implements OnInit {

	mostrandoResultadosFiltrados = false;
	cargando: boolean = false;
	creando: boolean = false;
	titulo: string = '';
	cita: Cita = new Cita();
	pacientes: Paciente[] = [];	
	usuarios: Usuario[] = [];	
	asistenciasAClase: AsistenciaAClase = new AsistenciaAClase();
	fecha: string = '';
	paginacion: PaginationManager = new PaginationManager();
	seleccion: number[] = [];

	constructor(

		private citasService: CitasService,
		private pacientesService: PacientesService,
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoAsistenciaAClasesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			if (data.asistenciasClase) {

				
				this.asistenciasAClase = data.asistenciasClase;
				this.fecha = this.asistenciasAClase.fecha;
				this.usuarios = this.asistenciasAClase.usuarios;
				console.log('usaurios:'+this.usuarios);
				this.titulo = "Asistencia a Clase " + this.asistenciasAClase.clase.nombre + " del día " + this.fecha;
				this.creando = false;
				
				
			} else {
				this.titulo = "Crear Cita";
				this.creando = true;
			}

			//this.obtenerPacientes();
		}

	ngOnInit(): void {
	}

	refrescar() {
		this.cargando = true;
        this.citasService
            .obtenerCitaPorId(this.cita.idCita)
            .then(cita => {
				this.cita = cita;

				this.cita.fecha = this.cita.fecha.split(' ')[0];

				console.log(this.pacientes);
				if (this.cita.paciente && this.cita.paciente.idCliente) this.cita.paciente = this.pacientes.find(e => e.idCliente == this.cita.paciente.idCliente);
				console.log(this.cita);
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
	}

	obtenerPacientes() {
		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'))
        this.cargando = true;
        this.pacientesService
            .obtenerPacientes(usuario.sociedad.sociedad)
            .then(pacientes => {
				this.pacientes = pacientes;
				if (!this.creando) this.refrescar();
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	crear() {
        this.cargando = true;
        this.citasService
            .insertarCita(this.cita)
            .then(cita => {
				this.cerrar('creado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	editar() {
		this.cargando = true;
        this.citasService
            .editarCita(this.cita)
            .then(usuario => {
				this.cerrar('editado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	eliminar() {
		this.cargando = true;
        this.citasService
            .eliminarCita(this.cita.idCita)
            .then(usuario => {
				this.cerrar('editado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}
	

	cerrar(accion: string = "") { this.dialogRef.close(accion); }

	estanTodosSeleccionados() {
        return this.seleccion.length == this.usuarios.length;
    }

    checkAll(event: Event, id: string) {
        if (this.estanTodosSeleccionados()) this.seleccion = [];
        else {
            this.seleccion = [];
            this.usuarios.forEach(u => this.seleccion.push(u.idUsuario));
        }
    }

    estaSeleccionado(id: number) {
        return this.seleccion.find(e => e == id) != null;
    }

}
