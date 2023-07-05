import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialClinicoNavComponent } from './historial-clinico-nav/historial-clinico-nav.component';
import { HistorialPacientesComponent } from './historial-pacientes/historial-pacientes.component';
import { HistorialClinicoRoutingModule } from './historial-clinico-routing.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { DentalUiModule } from '../dental-ui/dental-ui.module';
import { DialogoHistorialComponent } from './dialogo-historial/dialogo-historial.component';
import { HistorialClinicoHomeComponent } from './historial-clinico-home/historial-clinico-home.component';



@NgModule({
	declarations: [
		HistorialClinicoNavComponent, 
		HistorialPacientesComponent, 
		DialogoHistorialComponent, HistorialClinicoHomeComponent,
	],
	imports: [
		CommonModule,
		DentalUiModule,
		HistorialClinicoRoutingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FormsModule,
        MatStepperModule,
        MatSliderModule,
        MatSelectModule,
	],
    entryComponents: [
        DialogoHistorialComponent,
    ]
})
export class HistorialClinicoModule { }
