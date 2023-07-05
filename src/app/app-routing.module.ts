import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { InicioComponent } from './common/inicio/inicio.component';
import { TusCredencialesComponent } from './common/tus-credenciales/tus-credenciales.component';


const routes: Routes = [

    // CORE
    { path: 'ingresar', component: LoginComponent, },
    { path: 'inicio', component: InicioComponent, },
    { path: 'credenciales', component: TusCredencialesComponent, },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },

    { // ADMINISTRADOR (GENERAL)
        path: 'administracion-general',
        loadChildren: () => import('./administracion-general/administracion-general.module').then(m => m.AdministracionGeneralModule)
    },
    { // AGENDA
        path: 'agenda',
        loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule)
    },
    { // HISTORIAL CLINICO
        path: 'historial-clinico',
        loadChildren: () => import('./historial-clinico/historial-clinico.module').then(m => m.HistorialClinicoModule)
    },
    { // PAGOS
        path: 'pagos',
        loadChildren: () => import('./pagos/pagos.module').then(m => m.PagosModule)
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
