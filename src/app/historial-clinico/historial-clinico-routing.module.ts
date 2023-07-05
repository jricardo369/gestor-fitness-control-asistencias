import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialPacientesComponent } from './historial-pacientes/historial-pacientes.component';
import { RouterModule, Routes } from '@angular/router';
import { AppBarNavItem } from '../app-nav-item';
import { HistorialClinicoHomeComponent } from './historial-clinico-home/historial-clinico-home.component';

const routes: Routes = [
	{ path: 'historial-pacientes', component: HistorialPacientesComponent, },
	{ path: 'mi-historial', component: HistorialPacientesComponent, },

	{ path: 'home', component: HistorialClinicoHomeComponent, },
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
];

const MODULE: AppBarNavItem = {
	module: null,
	title: 'Historial Clínico',
	subtitle: null,
	uri: 'historial-clinico',
	svgName: 'historial',
	isVisibleFor: u => (u.rol == "2" && u.permisos.some(p => p.id === 2)) || u.rol == "3"
};

export const HISTORIAL_CLINICO_ITEMS: AppBarNavItem[] = [
	{
		module: MODULE,
		svgName: 'historia',
		title: 'Historial de pacientes',
		subtitle: 'Administra los usuarios y sus permisos en el portal',
		uri: 'historial-pacientes',
		isVisibleFor: u => u.rol == "2" && u.permisos.some(p => p.id === 2)
	},
	{
		module: MODULE,
		svgName: 'historia',
		title: 'Mi historial',
		subtitle: 'Administra los usuarios y sus permisos en el portal',
		uri: 'mi-historial',
		isVisibleFor: u => u.rol == "3"
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HistorialClinicoRoutingModule { }
