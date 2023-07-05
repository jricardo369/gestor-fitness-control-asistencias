import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from './../../../model/usuario';
import { Paciente } from './../../../model/paciente';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Sociedad } from 'src/model/sociedad';
import { Permiso } from './../../../model/permiso';

@Component({
  selector: 'app-dialogo-usuario',
  templateUrl: './dialogo-usuario.component.html',
  styleUrls: ['./dialogo-usuario.component.css']
})
export class DialogoUsuarioComponent implements OnInit {

	cargando: boolean = false;
	creando: boolean = false;
	titulo: string = 'Usuario';
	usuario: Usuario = new Usuario();
	pacientes: Paciente[] = [];
	paciente: Paciente = new Paciente();
	permisos: Permiso[] = [];
	

	constructor(
		private usuariosService: UsuariosService,
		private pacientesService: PacientesService,
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoUsuarioComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			this.permisos.push({ id: 1, nombre: "Administrar Citas"});
			this.permisos.push({ id: 2, nombre: "Administrar Historiales"});
			this.permisos.push({ id: 3, nombre: "Administrar Pagos"});
			if (data.idUsuario) {
				this.titulo = "Editar usuario"
				this.usuario.idUsuario = data.idUsuario;
				this.refrescar();
				this.creando = false;
			} else {
				this.titulo = "Crear usuario";
				this.creando = true;
				this.usuario.permisos = [];
			}
		}

	ngOnInit(): void {
	}

	estaSeleccionado(permiso: Permiso) {
        return this.usuario.permisos.find(p => p.id == permiso.id) != null;
    }

	check(event: Event, permiso: Permiso) {
        if ((event.srcElement as HTMLInputElement).checked) {
            //add
            if (!this.estaSeleccionado(permiso)) this.usuario.permisos.push(permiso);
        } else {
            //remove
            if (this.estaSeleccionado(permiso)) this.usuario.permisos.splice(this.usuario.permisos.indexOf(permiso), 1);
        }
    }

	refrescar() {
        this.cargando = true;
        this.usuariosService
            .obtenerUsuarioPorId(this.usuario.idUsuario)
            .then(usuario => {
                this.usuario = usuario;
// console.log(usuario)
				if(this.usuario.rol == "3") {
					this.obtenerPacientes();
				} else this.usuario.paciente = 0;
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	obtenerPacientes() {
		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'))
        this.cargando = true;
        this.pacientesService
            .obtenerPacientes(usuario.sociedad.sociedad)
            .then(pacientes => {
				this.pacientes = pacientes;

				if(this.usuario.paciente > 0) {
					this.paciente = this.pacientes.find(e => e.idCliente == this.usuario.paciente);
					this.pacienteSelected();
				}
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	rolSelected() {
		if(this.usuario.rol == "3") {
			this.obtenerPacientes();
		} else this.usuario.paciente = 0;
	}

	pacienteSelected() {
		this.usuario.nombre = this.paciente.nombre;
		this.usuario.ciudad = this.paciente.ciudad;
		this.usuario.telefono = this.paciente.telefono;
	}

	crear() {
		this.usuario.sociedad = { sociedad: 1, nombre: "", fechaCreacion: "", estatus: true };
		// let date = new Date();
		// this.usuario.fechaCreacion = new Date().toLocaleDateString();
		// this.usuario.fechaCreacion = "2020-12-20";
		this.usuario.estatus = "1";
		

		this.cargando = true;
        this.usuariosService
            .insertarUsuario(this.usuario)
            .then(usuario => {
				this.cerrar('creado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	editar() {
		this.cargando = true;
        this.usuariosService
            .editarUsuario(this.usuario)
            .then(usuario => {
				this.cerrar('editando');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	eliminar() {
		this.cargando = true;
        this.usuariosService
            .eliminarUsuario(this.usuario.idUsuario)
            .then(usuario => {
				this.cerrar('editando');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	cerrar(accion: string = "") { this.dialogRef.close(accion); }

}
