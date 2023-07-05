import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Filter, UtilService } from 'src/app/services/util.service';
import { PaginationManager } from 'src/util/pagination';
import { PacientesService } from './../../services/pacientes.service';
import { Paciente } from './../../../model/paciente';
import { Usuario } from './../../../model/usuario';
import { DialogoSimpleComponent } from 'src/app/common/dialogo-simple/dialogo-simple.component';
import { DialogoPacienteComponent } from '../dialogo-paciente/dialogo-paciente.component';

@Component({
	selector: 'app-pacientes',
	templateUrl: './pacientes.component.html',
	styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
	
    cargando: boolean = false;

    mostrandoResultadosFiltrados = false;
    
    filters: Filter[] = [];
    pacientes: Paciente[] = [];
    pacientesSinFiltrar: Paciente[] = [];
    seleccion: number[] = [];

    paginacion: PaginationManager = new PaginationManager();
    
    constructor(
		private router: Router,
		private pacientesService: PacientesService,
		public utilService: UtilService,
        private dialog: MatDialog
    ) {
		this.refrescar();
	}

    ngOnInit(): void {
    }

    refrescar() {
        let usuario: Usuario = JSON.parse(localStorage.getItem('objUsuario'))
        this.cargando = true;
        this.pacientesService
            .obtenerPacientes(usuario.sociedad.sociedad)
            .then(pacientes => {
				this.pacientesSinFiltrar = pacientes;
                this.pacientes = this.pacientesSinFiltrar.filter(e => true);
                this.paginacion.setArray(this.pacientes);
            })
            .catch(reason => this.utilService.manejarError(reason))
            .then(() => this.cargando = false)
    }

	estanTodosSeleccionados() {
        return this.seleccion.length == this.pacientes.length;
    }

    checkAll(event: Event, id: string) {
        if (this.estanTodosSeleccionados()) this.seleccion = [];
        else {
            this.seleccion = [];
            this.pacientes.forEach(u => this.seleccion.push(u.idCliente));
        }
    }

    estaSeleccionado(id: number) {
        return this.seleccion.find(e => e == id) != null;
    }

    check(event: Event, id: number) {
        if ((event.srcElement as HTMLInputElement).checked) {
            //add
            if (!this.estaSeleccionado(id)) this.seleccion.push(id);
        } else {
            //remove
            if (this.estaSeleccionado(id)) this.seleccion.splice(this.seleccion.indexOf(id), 1);
        }
    }

    agregarFiltro() {
        this.filters.push(new Filter());
    }

    eliminarFiltro(f: Filter) {
        let start = this.filters.indexOf(f);
        let deleteCount = 1;
        this.filters.splice(start, deleteCount);
        if (this.filters.length == 0)
            this.aplicarFiltros();
    }

    limpiarFiltros() {
        this.filters = [];
        this.aplicarFiltros();
    }

    aplicarFiltros() {
        let filtered = [];
        u: for (let i = 0; i < this.pacientesSinFiltrar.length; i++) {
            let r = this.pacientesSinFiltrar[i];
            for (let j = 0; j < this.filters.length; j++) {
                let f = this.filters[j];

                let v = null;

                switch (f.campo) {
                    case 'id': v = r.idCliente; break;
                    case 'nombre': v = r.nombre; break;
                    case 'telefono': v = r.telefono; break;
                    case 'email': v = r.correoElectronico; break;
                    case 'sociedad': v = r.sociedad; break;
                }

                switch (f.operador) {
                    case "!=": if (!(v != f.valor)) continue u; break;
                    case "==": if (!(v == f.valor)) continue u; break;
                    case ">=": if (!(v >= f.valor)) continue u; break;
                    case "<=": if (!(v <= f.valor)) continue u; break;
                    case ">": if (!(v > f.valor)) continue u; break;
                    case "<": if (!(v < f.valor)) continue u; break;
                    case "startsWith": if (!(('' + v).toLowerCase().startsWith(('' + f.valor).toLowerCase()))) continue u; break;
                    case "endsWith": if (!(('' + v).toLowerCase().endsWith(('' + f.valor).toLowerCase()))) continue u; break;
                    case "includes": if (!(('' + v).toLowerCase().includes(('' + f.valor).toLowerCase()))) continue u; break;
                }

            }
            filtered.push(r);
        };
        this.pacientes = filtered;
        this.pacientes.sort((a, b) => b.idCliente - a.idCliente);
        this.paginacion.setArray(this.pacientes);
    }

    eliminar() {

        this.dialog.open(DialogoSimpleComponent, {
            data: {
                titulo: 'Eliminar ' + this.seleccion.length + ' cliente(s)',
                texto: 'Está a punto de eliminar ' + this.seleccion.length + ' cliente(s). Esta operación no es reversible.',
                botones: [
                    { texto: 'No eliminar', color: '', valor: '' },
                    { texto: 'Eliminar cliente(s)', color: 'primary', valor: 'eliminar' },
                ]
            },
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'eliminar') {
                this.cargando = true;
                let promises = [];
                this.seleccion.forEach(id => promises.push(this.pacientesService.eliminarPaciente(id)));
                Promise
                    .all(promises)
                    .then(results => {
                        this.cargando = false;
                        let failed = [];
                        results.forEach(r => { if (r.success == false) failed.push(r) });
                        if (failed.length > 0) {
                            this.dialog.open(DialogoSimpleComponent, {
                                data: {
                                    titulo: 'Cliente(s) no eliminado(s)',
                                    texto: failed.length == 1 ? '1 cliente no pudo ser eliminado mediante la eliminación masiva, eliminelo desde su pantalla individual.' : 
                                        failed.length + ' clientes no pudieron ser eliminados mediante la eliminación masiva, eliminelos individualmente.',
                                    botones: [{ texto: 'Entendido', color: 'accent' },]
                                },
                                disableClose: true,
                            });
                        }
                        this.refrescar();
                    }).catch(e => {
                        //window.alert("ALGO NO SALIO BIEN");
                        this.utilService.manejarError(e);
                        this.cargando = false;
                    });
            }
        }).catch(reason => this.utilService.manejarError(reason));

        
    }

    crearPaciente() {
		this.dialog.open(DialogoPacienteComponent, {
            data: {},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'creado') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

	editarPaciente(idCliente: number) {
		this.dialog.open(DialogoPacienteComponent, {
            data: {
				idCliente: idCliente
			},
            disableClose: true,
        }).afterClosed().toPromise().then(valor => {
            if (valor == 'editando') this.refrescar();
        }).catch(reason => this.utilService.manejarError(reason));
	}

}
