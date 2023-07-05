import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV_MENU_IZQUIERDA_TEMPLATE, NAV_MENU_IZQUIERDA_STYLES, UtilServiceTest } from 'src/app/app-nav-item';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';
import { PAGOS_ITEMS } from '../pagos-routing.module';
let ITEMS = PAGOS_ITEMS;

@Component({
  selector: 'app-pagos-nav',
  template: NAV_MENU_IZQUIERDA_TEMPLATE,
  styles: [NAV_MENU_IZQUIERDA_STYLES]
})
export class PagosNavComponent extends UtilServiceTest {
	constructor(router: Router, utilService: UtilService, usuariosService: UsuariosService) {
		super(router, utilService, usuariosService, ITEMS);
	}
}
