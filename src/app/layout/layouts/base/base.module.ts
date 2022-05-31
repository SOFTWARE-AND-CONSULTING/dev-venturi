import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { SharedModule } from 'app/shared/shared.module';
import { BaseLayoutComponent } from './base.component';

@NgModule({
    declarations: [
        BaseLayoutComponent
    ],
    imports     : [
        RouterModule,
        FuseLoadingBarModule,
        SharedModule,
        MatButtonModule,
        MatIconModule,
    ],
    exports     : [
        BaseLayoutComponent
    ]
})
export class BaseLayoutModule
{
}
