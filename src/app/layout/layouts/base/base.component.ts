import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/modules/landing/services/api.service';
import { Subject } from 'rxjs';

@Component({
    selector     : 'base-layout',
    templateUrl  : './base.component.html',
    encapsulation: ViewEncapsulation.None
})
export class BaseLayoutComponent implements OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(public apiService:ApiService, private _router: Router)
    {
    }

    cerrarSideBar(){
        this.apiService.sidebar = !this.apiService.sidebar
    }

    salir(){
        localStorage.removeItem('codusuario');
        localStorage.removeItem('accessToken');
        this._router.navigate(['']);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
