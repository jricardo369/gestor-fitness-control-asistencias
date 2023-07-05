import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppBarNavItem } from '../app-nav-item';
import { CustomI18nService } from '../custom-i18n.service';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PacientesComponent } from './pacientes/pacientes.component';

const routes: Routes = [
    { path: 'usuarios', component: UsuariosComponent, },
    { path: 'pacientes', component: PacientesComponent, },

    { path: '', pathMatch: 'full', redirectTo: 'usuarios' },
];

const MODULE: AppBarNavItem = {
    module: null,
    title: 'Administración general',
    subtitle: null,
    uri: 'administracion-general',
    svgName: 'administracion',
    isVisibleFor: u => u.rol == "1"
};

export const ADMIN_GENERAL_ITEMS: AppBarNavItem[] = [
    {
        module: MODULE,
        svgName: 'users',
        title: 'Usuarios',
        subtitle: 'Administra los usuarios y sus permisos en el portal',
        uri: 'usuarios',
        isVisibleFor: u => u.rol == "1"
    },
    {
        module: MODULE,
        svgName: 'pacientes',
        title: 'Pacientes',
        subtitle: 'Administra los pacientes y sus permisos en el portal',
        uri: 'pacientes',
        isVisibleFor: u => u.rol == "1"
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministracionGeneralRoutingModule {
}
