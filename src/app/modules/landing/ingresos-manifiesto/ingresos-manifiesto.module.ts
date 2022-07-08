import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { IngesosManifiestoComponent } from './ingresos-manifiesto.component';
import { IngesosManifiestoRoutes } from './ingresos-manifiesto.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogManifiestoComponent } from './dialog-manifiesto/dialog-manifiesto.component';
import { MatSelectModule } from '@angular/material/select';
import { DialogAggItemsComponent } from './dialog-agg-items/dialog-agg-items.component';
import {
    MatSnackBarModule
  } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        IngesosManifiestoComponent,
        DialogManifiestoComponent,
        DialogAggItemsComponent
    ],
    imports: [
        RouterModule.forChild(IngesosManifiestoRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule,
        MatMenuModule,
        MatRadioModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatMomentDateModule,
        MatInputModule,
        MatTableModule,
        MatCheckboxModule,
        MatBadgeModule,
        MatDialogModule,
        MatSelectModule,
        MatSnackBarModule,
    ],
    entryComponents: [DialogManifiestoComponent, DialogAggItemsComponent],
    exports: [
        MatInputModule
    ]
})
export class IngesosManifiestoModule {
}
