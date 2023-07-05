import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilService } from '../../services/util.service';
import { CustomI18nService } from 'src/app/custom-i18n.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

    @Output()
    onLogin: EventEmitter<any> = new EventEmitter();
    
    user: Usuario = new Usuario();
    password: string;
    loading: boolean = false;
    navigateToHomeAfterLogin: boolean = false;

    constructor(
        private sessionService: SessionService,
        private i18n: CustomI18nService,
        private router: Router,
        private utilService: UtilService,
        private dialog: MatDialog) {
    }

    ngOnInit() { }

    ingresar() {
        if (this.user.usuario == localStorage.getItem('usuario')) {
            this.loading = true;
            this.sessionService
            .iniciarSesion(this.user.usuario, this.password)
            .then(success => {
                if (success) {
                    this.utilService.iniciarContadorDeSesion();
                    this.onLogin.emit(success);
                } else {
                    this.utilService.mostrarDialogoSimple(
                        "Credenciales incorrectas",
                        "El usuario o la contraseña no coinciden, verifique sus credenciales y pruebe de nuevo");
                }
            }).catch(reason => {
                if (reason instanceof HttpErrorResponse && (reason as HttpErrorResponse).status == 0) {
                    // this.loading = false;
                    this.utilService.mostrarDialogoSimple(
                        this.i18n.get('Error de conexión'),
                        this.i18n.get('No se logró la conexión con el servidor')
                    );
                } else {
                    this.utilService.manejarError(reason)
                }
            }).then(() => this.loading = false);
        }
        else {
            this.utilService.mostrarDialogoSimple(
                this.i18n.get('No se puede reanudar la sesión'),
                this.i18n.get('El usuario con el que está intentando reanudar la sesión no coincide con el usuario de la sesión actual, verifique por favor.')
            );
        }
    }
}