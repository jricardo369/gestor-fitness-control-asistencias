import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { Pago } from './../../model/pago';
import { TipoPago } from './../../model/tipoPago';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
	
	constructor(private http: HttpClient) { }

    obtenerTiposMovimientos(): Promise<TipoPago[]> {
        return new Promise<TipoPago[]>((resolve, reject) => this.http
            .get(API_URL + 'tipos-movimientos',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as TipoPago[]);
            })
            .catch(reason => reject(reason))
        );
    }

	obtenerMovimientosDePaciente(idPaciente: number): Promise<Pago[]> {
        return new Promise<Pago[]>((resolve, reject) => this.http
            .get(API_URL + 'movimientos/por-paciente/' + idPaciente,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Pago[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerMovimientosDePacientePorFecha(idPaciente: number, fechaInicio: string, fechaFin: string): Promise<Pago[]> {
        let params = new HttpParams();
        params = params.set('fechai', fechaInicio);
        params = params.set('fechaf', fechaFin);
        return new Promise<Pago[]>((resolve, reject) => this.http
            .get(API_URL + 'movimientos/por-paciente/' + idPaciente + '/por-fecha',
            {
                params: params,
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Pago[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerMovimientosPorFecha(fechaInicio: string, fechaFin: string): Promise<Pago[]> {
        let params = new HttpParams();
        params = params.set('fechai', fechaInicio);
        params = params.set('fechaf', fechaFin);
        return new Promise<Pago[]>((resolve, reject) => this.http
            .get(API_URL + 'movimientos/por-fecha',
            {
                params: params,
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Pago[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerMovimientoPorId(idMovimiento: number): Promise<Pago> {
        return new Promise<Pago>((resolve, reject) => this.http
            .get(API_URL + 'movimientos/' + idMovimiento,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Pago);
            })
            .catch(reason => reject(reason))
        );
    }

    insertarMovimiento(pago: Pago): Promise<Pago> {
		let body = {
			fecha: pago.fecha,
			monto: pago.monto,
			idUsuario: pago.usuario.idUsuario,
			idTipoMovimiento: pago.tipoMovimiento.idTipo,
            descripcion: pago.descripcion,
		};
        return new Promise<Pago>((resolve, reject) => this.http
            .post(API_URL + 'movimientos', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Pago);
            })
            .catch(reason => reject(reason))
        );
    }

    editarMovimiento(pago: Pago): Promise<Pago> {
        let body = {
			idMovimiento: pago.idMovimiento,
			fecha: pago.fecha,
			monto: pago.monto,
			idUsuario: pago.usuario.idUsuario,
			idTipoMovimiento: pago.tipoMovimiento.idTipo,
            descripcion: pago.descripcion,
		};
        return new Promise<Pago>((resolve, reject) => this.http
            .put(API_URL + 'movimientos', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Pago);
            })
            .catch(reason => reject(reason))
        );
    }

    eliminarMovimiento(idMovimiento: number): Promise<Pago> {
        return new Promise<Pago>((resolve, reject) => this.http
            .delete(API_URL + 'movimientos/' + idMovimiento,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Pago);
            })
            .catch(reason => reject(reason))
        );
    }
}
