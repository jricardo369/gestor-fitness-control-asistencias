import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/model/usuario';

@Component({
	selector: 'app-pagos-home',
	templateUrl: './pagos-home.component.html',
	styleUrls: ['./pagos-home.component.css']
})
export class PagosHomeComponent implements OnInit {

	constructor(private router: Router) {
        let rol = (JSON.parse(localStorage.getItem('objUsuario')) as Usuario).rol;

        if (rol == "2") {
            this.router.navigateByUrl('/pagos/pagos');
        }
        else if (rol == "3") {
            this.router.navigateByUrl('/pagos/mis-pagos');
        }
    }

	ngOnInit(): void {
	}

}
