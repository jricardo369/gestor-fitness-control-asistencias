import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceNavComponent } from '../common/workspace-nav/workspace-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { ExperimentalMenuComponent } from '../common/experimental-menu/experimental-menu.component';

@NgModule({
    declarations: [
        WorkspaceNavComponent,
        ExperimentalMenuComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        WorkspaceNavComponent,
        ExperimentalMenuComponent,
    ]
})
export class DentalUiModule { }
