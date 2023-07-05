import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { Usuario } from 'src/model/usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomI18nService } from 'src/app/custom-i18n.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    baseHref = document.baseURI;

    user: Usuario = new Usuario();
    loading = false;

    password: string = null;

    constructor(
        private utilService: UtilService,
        private sessionService: SessionService,
        private router: Router,
        private i18n: CustomI18nService,
    ) {
        this.utilService.deshabilitaRetroceso();
    }

    ingresar() {
        if (localStorage.getItem('usuario') == null) {
            this.loading = true;
            this.sessionService
                .iniciarSesion(this.user.usuario, this.user.contrasenia)
                .then(success => {
                    
                    if (success) {
                        this.utilService.iniciarContadorDeSesion();
                        this.router.navigate(['/inicio']);
                    } else {
                        //this.loading = false;
                        this.utilService.mostrarDialogoSimple(
                            this.i18n.get('Credenciales incorrectas'),
                            this.i18n.get('El usuario o la contraseña no coinciden, verifique sus credenciales y pruebe de nuevo')
                        );
                    }
                }).catch(reason => {
                    if (reason instanceof HttpErrorResponse && (reason as HttpErrorResponse).status == 0) {
                        //this.loading = false;
                        this.utilService.mostrarDialogoSimple(
                            this.i18n.get('Error de conexión'),
                            this.i18n.get('No se logró la conexión con el servidor')
                        );
                    } else {
                        this.utilService.manejarError(reason)
                    }
                }).then(() => this.loading = false);
        } else {
            this.utilService.mostrarDialogoSimple(
                this.i18n.get('Una sesión activa'),
                this.i18n.get('Actualmente ya hay una sesión activa en este navegador web. Por favor, cierre sesión para poder iniciar una sesión nueva.')
            );
        }
    }

    changeLang(lang) {
        document.location.href = document.location.href
            .replace('/en', '/$lang')
            .replace('/es', '/$lang')
            .replace('$lang', lang);
    }

    getBrowserInfo() {
        var ua= navigator.userAgent, tem, 
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    };
    
    recuperar() {}
}
