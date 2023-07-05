import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosNavComponent } from './pagos-nav/pagos-nav.component';
import { PagosComponent } from './pagos/pagos.component';
import { PagosRoutingModule } from './pagos-routing.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { DentalUiModule } from '../dental-ui/dental-ui.module';
import { DialogoPagoComponent } from './dialogo-pago/dialogo-pago.component';
import { PagosHomeComponent } from './pagos-home/pagos-home.component';



@NgModule({
	declarations: [
		PagosNavComponent, 
		PagosComponent, 
		DialogoPagoComponent, PagosHomeComponent,
	],
	imports: [
		CommonModule,
		DentalUiModule,
		PagosRoutingModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FormsModule,
        MatStepperModule,
        MatSliderModule,
        MatSelectModule,
	],
    entryComponents: [
        DialogoPagoComponent,
    ]
})
export class PagosModule { }
