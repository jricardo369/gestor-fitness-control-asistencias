import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { Cita } from './../../model/cita';

@Injectable({
    providedIn: 'root'
})
export class CitasService {

	constructor(private http: HttpClient) { }

	obtenerCitas(): Promise<Cita[]> {
        return new Promise<Cita[]>((resolve, reject) => this.http
            .get(API_URL + 'citas',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Cita[]);
            })
            .catch(reason => reject(reason))
        );
    }

	obtenerCitasPorSemana(semana: string): Promise<Cita[]> {
        return new Promise<Cita[]>((resolve, reject) => this.http
            .get(API_URL + 'citas/citas-por-semana/' + semana,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Cita[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerCitaPorId(idCita: number): Promise<Cita> {
        return new Promise<Cita>((resolve, reject) => this.http
            .get(API_URL + 'citas/' + idCita,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Cita);
            })
            .catch(reason => reject(reason))
        );
    }

    insertarCita(cita: Cita): Promise<Cita> {
		let body = {
			comentario: cita.comentario,
			idPaciente: cita.paciente.idCliente,
			idUsuario: parseInt(localStorage.getItem('idUsuario')),
			fecha: cita.fecha,
			horaInicio: cita.horaInicio,
			horaFin: cita.horaFin
		};
        return new Promise<Cita>((resolve, reject) => this.http
            .post(API_URL + 'citas', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Cita);
            })
            .catch(reason => reject(reason))
        );
    }

    editarCita(cita: Cita): Promise<Cita> {
        let body = {
			comentario: cita.comentario,
			idPaciente: cita.paciente.idCliente,
			idUsuario: parseInt(localStorage.getItem('idUsuario')),
			fecha: cita.fecha,
			horaInicio: cita.horaInicio,
			horaFin: cita.horaFin,
            idCita: cita.idCita
		};
        return new Promise<Cita>((resolve, reject) => this.http
            .put(API_URL + 'citas', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Cita);
            })
            .catch(reason => reject(reason))
        );
    }

    eliminarCita(idCita: number): Promise<Cita> {
        return new Promise<Cita>((resolve, reject) => this.http
            .delete(API_URL + 'citas/' + idCita,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Cita);
            })
            .catch(reason => reject(reason))
        );
    }
}
