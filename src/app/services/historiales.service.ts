import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoHistorial } from '../../model/tipoHistorial';
import { API_URL } from '../app.config';
import { Historial } from './../../model/historial';

@Injectable({
    providedIn: 'root'
})
export class HistorialesService {

	constructor(private http: HttpClient) { }

	obtenerHistoriales(): Promise<Historial[]> {
        return new Promise<Historial[]>((resolve, reject) => this.http
            .get(API_URL + 'historiales',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Historial[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerTiposHistoriales(): Promise<TipoHistorial[]> {
        return new Promise<TipoHistorial[]>((resolve, reject) => this.http
            .get(API_URL + 'tipos-historiales',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as TipoHistorial[]);
            })
            .catch(reason => reject(reason))
        );
    }

	obtenerHistorialesPorFecha(fecha: string): Promise<Historial[]> {
        return new Promise<Historial[]>((resolve, reject) => this.http
            .get(API_URL + 'historiales/historiales-por-fecha/' + fecha,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Historial[]);
            })
            .catch(reason => reject(reason))
        );
    }

	obtenerHistorialesDePacientePorFechas(idPaciente: number, fechaInicio: string, fechaFin: string): Promise<Historial[]> {
		let params = new HttpParams();
        params = params.set('fechai', fechaInicio);
        params = params.set('fechaf', fechaFin);
        return new Promise<Historial[]>((resolve, reject) => this.http
            .get(API_URL + 'historiales/historiales-por-semana/' + idPaciente,
            {
				params: params,
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Historial[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerHistorialPorId(idHistorial: number): Promise<Historial> {
        return new Promise<Historial>((resolve, reject) => this.http
            .get(API_URL + 'historiales/' + idHistorial,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Historial);
            })
            .catch(reason => reject(reason))
        );
    }

    insertarHistorial(historial: Historial): Promise<Historial> {
		let body = {
			descripcion: historial.descripcion,
			fecha: historial.fecha,
			idPaciente: historial.paciente.idCliente,
			tipo: historial.tipo.idTipoHistorial,
			idUsuario: parseInt(localStorage.getItem('idUsuario'))
		};
        return new Promise<Historial>((resolve, reject) => this.http
            .post(API_URL + 'historiales', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Historial);
            })
            .catch(reason => reject(reason))
        );
    }

    editarHistorial(historial: Historial): Promise<Historial> {
        let body = {
			descripcion: historial.descripcion,
			idPaciente: historial.paciente.idCliente,
			fecha: historial.fecha,
			tipo: historial.tipo.idTipoHistorial,
			idUsuario: parseInt(localStorage.getItem('idUsuario')),
            idHistorial: historial.idHistorial
		};
        return new Promise<Historial>((resolve, reject) => this.http
            .put(API_URL + 'historiales', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Historial);
            })
            .catch(reason => reject(reason))
        );
    }

    eliminarHistorial(idHistorial: number): Promise<Historial> {
        return new Promise<Historial>((resolve, reject) => this.http
            .delete(API_URL + 'historiales/' + idHistorial,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Historial);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerAdjuntosHistorial(idHistorial: number): Promise<any> {
        return new Promise<any>((resolve, reject) => this.http
            .get(API_URL + 'adjuntos/historial/' + idHistorial + '/adjunto' + idHistorial,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as any);
            })
            .catch(reason => reject(reason))
        );
    }

    insertarAdjuntosHistorial(idHistorial: number): Promise<Historial> {
        return new Promise<Historial>((resolve, reject) => this.http
            .post(API_URL + 'hisadjuntos/historial/' + idHistorial + '/adjuntotoriales', idHistorial,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Historial);
            })
            .catch(reason => reject(reason))
        );
    }
}
