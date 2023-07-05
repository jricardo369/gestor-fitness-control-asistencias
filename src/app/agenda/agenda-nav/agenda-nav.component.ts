import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV_MENU_IZQUIERDA_STYLES, NAV_MENU_IZQUIERDA_TEMPLATE, UtilServiceTest } from 'src/app/app-nav-item';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';
import { AGENDA_ITEMS } from '../agenda-routing.module';
let ITEMS = AGENDA_ITEMS;

@Component({
  selector: 'app-agenda-nav',
  template: NAV_MENU_IZQUIERDA_TEMPLATE,
  styles: [NAV_MENU_IZQUIERDA_STYLES]
})
export class AgendaNavComponent extends UtilServiceTest {
	constructor(router: Router, utilService: UtilService, usuariosService: UsuariosService) {
		super(router, utilService, usuariosService, ITEMS);
	}
}
