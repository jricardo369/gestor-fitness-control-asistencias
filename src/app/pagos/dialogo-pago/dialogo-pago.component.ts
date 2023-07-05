import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';
import { Sociedad } from './../../../model/sociedad';
import { Usuario } from './../../../model/usuario';
import { Pago } from './../../../model/pago';
import { TipoPago } from './../../../model/tipoPago';
import { PagosService } from './../../services/pagos.service';

@Component({
  selector: 'app-dialogo-pago',
  templateUrl: './dialogo-pago.component.html',
  styleUrls: ['./dialogo-pago.component.css']
})
export class DialogoPagoComponent implements OnInit {

	cargando: boolean = false;
	creando: boolean = false;
	esPaciente: boolean = false;
	mostrarCraerNvoClt: boolean = false;
	faltaNombreClt: boolean = false;
	titulo: string = '';

	pago: Pago = new Pago();
	usuarios: Usuario[] = [];
	usuario: Usuario = new Usuario();
	sociedad: Sociedad = new Sociedad();
	tiposPago: TipoPago[] = [];

	constructor(
		private pagosService: PagosService,
		private usuariosService: UsuariosService,
		public utilService: UtilService,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef<DialogoPagoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
			// this.tiposPago.push({ idTipo: 1, descripcion: "Cargo"});
			// this.tiposPago.push({ idTipo: 2, descripcion: "Abono"});
			if (data.idMovimiento) {
				this.titulo = "Pago"
				this.creando = false;
				this.pago.idMovimiento = data.idMovimiento;
				this.esPaciente = data.esPaciente;
			} else {
				this.titulo = "Nuevo Pago";
				this.creando = true;
			}

			this.ejecutarServicios();
		}

	ngOnInit(): void {
	}

	ejecutarServicios() {

		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'))
		let promises = [];
		promises.push(this.usuariosService.obtenerUsuarios());
		promises.push(this.pagosService.obtenerTiposMovimientos());

		this.cargando = true;
		Promise
            .all(promises)
            .then(results => {
                console.log(results)
				this.usuarios = results[0];
				this.tiposPago = results[1];
				if (!this.creando) this.refrescar();
            }).catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	refrescar() {
		this.cargando = true;
        this.pagosService
            .obtenerMovimientoPorId(this.pago.idMovimiento)
            .then(pago => {
				this.pago = pago;

				this.pago.fecha = this.pago.fecha.split(' ')[0];

				// console.log(this.pacientes);
				if (this.pago.usuario && this.pago.usuario.idUsuario) this.pago.usuario = this.usuarios.find(e => e.idUsuario == this.pago.usuario.idUsuario);
				if (this.pago.tipoMovimiento && this.pago.tipoMovimiento.idTipo) this.pago.tipoMovimiento = this.tiposPago.find(e => e.idTipo == this.pago.tipoMovimiento.idTipo);
				console.log(this.pago);
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
	}

	crear() {
        this.cargando = true;
        this.pagosService
            .insertarMovimiento(this.pago)
            .then(pago => {
				this.cerrar('creado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
    }

	editar() {
		this.cargando = true;
        this.pagosService
            .editarMovimiento(this.pago)
            .then(pago => {
				this.cerrar('editado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	eliminar() {
		this.cargando = true;
        this.pagosService
            .eliminarMovimiento(this.pago.idMovimiento)
            .then(pago => {
				this.cerrar('editado');
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false);
	}

	cerrar(accion: string = "") { this.dialogRef.close(accion); }

	crearCilente(){
		let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'))
		if(!this.usuario.nombre){this.faltaNombreClt = true}
		else{

			this.cargando =  true;

			this.faltaNombreClt = false;

			this.sociedad.sociedad = 1;
			this.usuario.sociedad = this.sociedad;
			this.usuario.estatus = "1";

			this.usuariosService
			.insertarUsuario(this.usuario)
			.then(paciente => {
				this.usuariosService
				.obtenerUsuarios()
				.then(response =>{
					this.usuarios = response;
				})
				.catch(error => this.utilService.manejarError(error));
				this.mostrarCraerNvoClt = false;
				
			})
			.catch(error => this.utilService.manejarError(error))
			.then(() => this.cargando = false)


		}
	}

}
