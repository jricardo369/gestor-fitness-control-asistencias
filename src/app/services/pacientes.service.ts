import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.config';
import { Paciente } from './../../model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

	constructor(private http: HttpClient) {}

    obtenerPacientes(sociedad: number): Promise<Paciente[]> {
        return new Promise<Paciente[]>((resolve, reject) => this.http
            .get(API_URL + 'pacientes/por-sociedad/'+sociedad,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Paciente[]);
            })
            .catch(reason => reject(reason))
        );
    }

    obtenerPaciente(idPaciente: number): Promise<Paciente> {
        console.log('obtener paciente:'+idPaciente);
        return new Promise<Paciente>((resolve, reject) => this.http
            .get(API_URL + 'pacientes/' + idPaciente,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Paciente);
            })
            .catch(reason => reject(reason))
        );
    }

    insertarPaciente(paciente: Paciente): Promise<Paciente> {
        return new Promise<Paciente>((resolve, reject) => this.http
            .post(API_URL + 'pacientes', paciente,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Paciente);
            })
            .catch(reason => reject(reason))
        );
    }

    editarPaciente(paciente: Paciente): Promise<Paciente> {
        return new Promise<Paciente>((resolve, reject) => this.http
            .put(API_URL + 'pacientes', paciente,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Paciente);
            })
            .catch(reason => reject(reason))
        );
    }

    eliminarPaciente(idPaciente: number): Promise<Paciente> {
        return new Promise<Paciente>((resolve, reject) => this.http
            .delete(API_URL + 'pacientes/' + idPaciente,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Paciente);
            })
            .catch(reason => reject(reason))
        );
    }
}
