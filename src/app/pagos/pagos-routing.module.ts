import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosComponent } from './pagos/pagos.component';
import { RouterModule, Routes } from '@angular/router';
import { AppBarNavItem } from '../app-nav-item';
import { PagosHomeComponent } from './pagos-home/pagos-home.component';

const routes: Routes = [
	{ path: 'pagos', component: PagosComponent, },
	{ path: 'mis-pagos', component: PagosComponent, },

	{ path: 'home', component: PagosHomeComponent, },
	{ path: '', pathMatch: 'full', redirectTo: 'home' },
];

const MODULE: AppBarNavItem = {
	module: null,
	title: 'Pagos',
	subtitle: null,
	uri: 'pagos',
	svgName: 'pago',
	isVisibleFor: u => (u.rol == "2" && u.permisos.some(p => p.id === 3)) || u.rol == "3"
};

export const PAGOS_ITEMS: AppBarNavItem[] = [
	{
		module: MODULE,
		svgName: 'pagos',
		title: 'Pagos',
		subtitle: 'Administra los usuarios y sus permisos en el portal',
		uri: 'pagos',
		isVisibleFor: u => u.rol == "2" && u.permisos.some(p => p.id === 3)
	},
	{
		module: MODULE,
		svgName: 'pagos',
		title: 'Mis pagos',
		subtitle: 'Administra los usuarios y sus permisos en el portal',
		uri: 'pagos',
		isVisibleFor: u => u.rol == "3"
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagosRoutingModule { }
