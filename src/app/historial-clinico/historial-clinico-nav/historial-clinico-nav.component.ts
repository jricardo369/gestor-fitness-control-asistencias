import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NAV_MENU_IZQUIERDA_STYLES, NAV_MENU_IZQUIERDA_TEMPLATE, UtilServiceTest } from 'src/app/app-nav-item';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UtilService } from 'src/app/services/util.service';
import { HISTORIAL_CLINICO_ITEMS } from '../historial-clinico-routing.module';
let ITEMS = HISTORIAL_CLINICO_ITEMS;

@Component({
  selector: 'app-historial-clinico-nav',
  template: NAV_MENU_IZQUIERDA_TEMPLATE,
  styles: [NAV_MENU_IZQUIERDA_STYLES]
})
export class HistorialClinicoNavComponent extends UtilServiceTest {
	constructor(router: Router, utilService: UtilService, usuariosService: UsuariosService) {
		super(router, utilService, usuariosService, ITEMS);
	}
}
