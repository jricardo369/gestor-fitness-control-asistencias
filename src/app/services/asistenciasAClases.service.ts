import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { AsistenciaAClase } from '../../model/asistenciaAClase';

@Injectable({
    providedIn: 'root'
})
export class AsistenciasAClaseService {

	constructor(private http: HttpClient) { }

	obtenerAsistenciaAClases(idClase: number,fecha: string): Promise<AsistenciaAClase[]> {
        return new Promise<AsistenciaAClase[]>((resolve, reject) => this.http
            .get(API_URL + 'asistencia-a-clases/'+fecha,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as AsistenciaAClase[]);
            })
            .catch(reason => reject(reason))
        );
    }

    insertarCita(asistenciaAClase: AsistenciaAClase): Promise<AsistenciaAClase> {
		let body = {
			usuario: asistenciaAClase.usuarios,
			clase: asistenciaAClase.clase,
			fecha: asistenciaAClase.fecha
		};
        return new Promise<AsistenciaAClase>((resolve, reject) => this.http
            .post(API_URL + 'asistencia-a-clases', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as AsistenciaAClase);
            })
            .catch(reason => reject(reason))
        );
    }

    editarCita(asistenciaAClase: AsistenciaAClase): Promise<AsistenciaAClase> {
        let body = {
			usuario: asistenciaAClase.usuarios,
			clase: asistenciaAClase.clase,
			fecha: asistenciaAClase.fecha
		};
        return new Promise<AsistenciaAClase>((resolve, reject) => this.http
            .put(API_URL + 'asistencia-a-clases', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as AsistenciaAClase);
            })
            .catch(reason => reject(reason))
        );
    }

    eliminarCita(idCita: number): Promise<AsistenciaAClase> {
        return new Promise<AsistenciaAClase>((resolve, reject) => this.http
            .delete(API_URL + 'asistencia-a-clases/' + idCita,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as AsistenciaAClase);
            })
            .catch(reason => reject(reason))
        );
    }
}
