import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'ingresos-manifiesto',
    templateUrl  : './ingresos-manifiesto.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class IngesosManifiestoComponent
{

    items: any = [
        {id: 1, label: 'Taquilla', icon:'mat_outline:storefront'},
        {id: 2, label: 'Operaciones', icon:'heroicons_outline:truck'},
        {id: 3, label: 'Administración', icon:'heroicons_outline:user-circle'},
        {id: 4, label: 'Consulta', icon:'heroicons_outline:document-search'},
        {id: 5, label: 'Escáner OffLine', icon:'heroicons_outline:printer'},
        {id: 6, label: 'Proc OnLine', icon:'heroicons_outline:refresh'},
        {id: 7, label: 'Reportes', icon:'heroicons_outline:document-report'},
        {id: 8, label: 'Mantenimiento', icon:'mat_outline:settings'},
    ];
    itemSelected: any;
    visible: boolean = true;
    displayedColumns: string[] = ['no', 'description', 'value'];
    /**
     * Constructor
     */
    constructor(private router: Router)
    {
    }

    goBack(){
        this.router.navigate(['/home'])
    }
}
