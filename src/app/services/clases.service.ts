import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { ClaseG } from '../../model/clase';

@Injectable({
    providedIn: 'root'
})
export class ClaseService {

	constructor(private http: HttpClient) { }

	obtenerClases(): Promise<ClaseG[]> {
        return new Promise<ClaseG[]>((resolve, reject) => this.http
            .get(API_URL + 'clases',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as ClaseG[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerClasesPorIdyFecha(idClase: number,fecha: string): Promise<ClaseG[]> {
        return new Promise<ClaseG[]>((resolve, reject) => this.http
            .get(API_URL + 'clases',
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as ClaseG[]);
            })
            .catch(reason => reject(reason))
        );
    }

    insertarCita(clase: ClaseG): Promise<ClaseG> {
		let body = {
			idClase: clase.idClase,
			nombre: clase.nombre
		};
        return new Promise<ClaseG>((resolve, reject) => this.http
            .post(API_URL + 'clases', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as ClaseG);
            })
            .catch(reason => reject(reason))
        );
    }

    editarCita(clase: ClaseG): Promise<ClaseG> {
        let body = {
			idClase: clase.idClase,
			nombre: clase.nombre
		};
        return new Promise<ClaseG>((resolve, reject) => this.http
            .put(API_URL + 'clases', body,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as ClaseG);
            })
            .catch(reason => reject(reason))
        );
    }

    eliminarCita(idClase: number): Promise<ClaseG> {
        return new Promise<ClaseG>((resolve, reject) => this.http
            .delete(API_URL + 'clases/' + idClase,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as ClaseG);
            })
            .catch(reason => reject(reason))
        );
    }
}
