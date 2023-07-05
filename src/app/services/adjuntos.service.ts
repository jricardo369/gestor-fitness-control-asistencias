import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adjunto } from 'src/model/adjunto';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AdjuntosService {

	constructor(private http: HttpClient) { }

    obtenerAdjuntosDeHistorial(idHistorial: number): Promise<Adjunto[]> {
        return new Promise<Adjunto[]>((resolve, reject) => this.http
            .get(API_URL + 'adjuntos/historial/' + idHistorial,
            {
                withCredentials: true,
                observe: 'response',
                headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', localStorage.getItem('auth_token'))
            })
            .toPromise()
            .then(response => {
                resolve(response.body as Adjunto[]);
            })
            .catch(reason => reject(reason))
        );
    }

	insertarAdjunto(idHistorial: number, archivo: File) {
        let formData = new FormData();
		formData.append('archivo', archivo);

        return new Promise((resolve, reject) => this.http
			.post(API_URL + 'adjuntos/historial/' + idHistorial + '/adjunto', formData, 
			{ 
				withCredentials: true,
				observe: 'response',
                headers: new HttpHeaders().append('Authorization', localStorage.getItem('auth_token'))
			})
			.toPromise()
			.then(response => {
				console.log(response);
				resolve(response.body);
			})
			.catch(reason => reject(reason))
        );
    }
}
