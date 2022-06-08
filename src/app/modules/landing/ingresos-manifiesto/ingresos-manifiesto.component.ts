import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogManifiestoComponent } from './dialog-manifiesto/dialog-manifiesto.component';
import { ApiService } from '../services/api.service'
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { DialogAggItemsComponent } from './dialog-agg-items/dialog-agg-items.component';

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
    /* Defining the columns that will be displayed in the table. */
    displayedColumns: string[] = ['no', 'description', 'value'];
    referencia:any;
    refAerea:any;
    creacionManifiesto: any;
    codUser: string;
    casilleros: any;
    casilleroSelected:any;
    shippers: any;
    shipperSelected: any;
    proveedores: any;
    proveedorSelected:any;
    codCasillero: any;
    nombrecasillero:any;
    tipoCliente:any;
    valorGlobal:any;
    sumaItems:any;
    otrosItem:any;
    totalFactura:any;
    tipoEnvio:any;
    pesoitems:any;
    altoitems:any;
    anchoitems:any;
    largoitems:any;
    volumenitems:any;
    dataItemSelect: Array<any> = [];
    codigoCliente: any;
    dataUser: any;
    statusPais: any;
    zipcode: any;
    statusSelected:any;
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private dialog: MatDialog,
        private api: ApiService
        )
    {
    }

    ngOnInit(): void{
       this.codUser = localStorage.getItem('codusuario');

       /* Traer casilleros */
       this.api.get(`casillero/show_siglas`).subscribe(
        (res) => {
          this.casilleros = res.data
          console.log(this.casilleros);

        },
        (error) => {
          console.log('error buscando la referencia', error)
        }
      );

        /* Traer shippers */
      this.api.get(`shipper/show_shippers`).subscribe(
        (res) => {
          console.log(res);
          this.shippers = res.data
        },
        (error) => {
          console.log('error buscando la referencia', error)
        }
      );

      /* Traer proveedores */
      this.api.get(`proveedor/show_proveedores`).subscribe(
        (res) => {
          console.log(res);
          this.proveedores = res.data
        },
        (error) => {
          console.log('error buscando la referencia', error)
        }
      );

    }

    checkaerea(aereo:any){
        this.refAerea =  aereo;
    }
    crearManifiestoForm(){
        Swal.fire({
            title: 'Hubo un problema al crear el manifiesto',
            icon: 'info',
            confirmButtonColor: '#050506',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
          })
    }

    openDialogagg() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            valorGlobal: this.valorGlobal,
            otro: this.totalFactura
        };

        this.dialog.open(DialogAggItemsComponent, dialogConfig);

        const dialogRef = this.dialog.open(DialogAggItemsComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
                console.log(data);


                if(data != undefined){
                    this.totalFactura = Number(this.totalFactura) + Number(data[0].value)
                    this.dataItemSelect.push(data[0]);
                    this.itemSelected = data[1]
                    console.log(this.dataItemSelect);
                    this.dialog.closeAll();

                }else{
                    this.dialog.closeAll();
                }


            }
        );
    }

    sumarTotal(){
       this.totalFactura=  this.otrosItem
    }

    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            referencia: this.referencia
        };

        this.dialog.open(DialogManifiestoComponent, dialogConfig);

        const dialogRef = this.dialog.open(DialogManifiestoComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
                this.creacionManifiesto = data?.shipper
                if(this.creacionManifiesto !=undefined){
                    this.crearManifiesto(this.creacionManifiesto)
                }else{
                    this.dialog.closeAll();
                }

            }
        );
    }

    buscarReferencia(){

        const loader:any = this.loadingFireToast('Consultando, por favor espere...');
        this.api.get(`seguridad/show/${this.referencia}`).subscribe(
            (res) => {
              console.log(res);
              if(res?.data?.length > 0){
                  this.preAlert();
                  loader.close();
              }else{
                this.openDialog();
                loader.close();
              }

            },
            (error) => {
              loader.close();
              console.log('error buscando la referencia', error)
            }
          );
    }

    preAlert(){
        //${this.referencia}
        this.api.get(`prealertreferencia/show/DRH0000002`).subscribe(
            (res) => {
              console.log(res);

              this.shipperSelected = res.data[0].nomcliente
              const proveedor = this.proveedores.filter(p => p.nombre==res.data[0].companiadestino)
              if(proveedor.length ==0){
                this.proveedorSelected = 7;
              }else{
                this.proveedorSelected = proveedor.codproveedor
              }

              const casillero = this.casilleros.filter(c => c.nombre==res.data[0].codcasillero.slice(0, 3))
                console.log(casillero);

                if(casillero.length !=0){
                    this.casilleroSelected = res.data[0].codcasillero.slice(0, 3)
                    this.codCasillero = res.data[0].codcasillero.slice(3);
                    this.consultarCasillero()
                    this.tipoCliente = 'CASILLERO INTERNACIONAL ZOOM';
                }else{
                    this.casilleroSelected = 'SCL';
                    this.codCasillero = res.data[0].codcasillero.slice(3);
                    this.api.get(`casillero/show/${this.codCasillero}`).subscribe(
                        (res) => {
                          console.log(res);
                          console.log(this.casilleroSelected);

                          //loader.close();
                            this.nombrecasillero = res.data[0].nombre
                            this.codigoCliente = res.data[0].codcliente
                            this.consultarCliente()

                        },
                        (error) => {
                          //loader.close();
                          console.log('error buscando la referencia', error)
                        }
                      );
                    this.tipoCliente = 'CASILLERO INTERNACIONAL ZOOM';
                }





            },
            (error) => {

              console.log('error buscando la referencia', error)
            }
          );
    }

    consultarCliente(){

        this.api.get(`cliente/show/${this.codigoCliente}`).subscribe(
            (res) => {
              this.dataUser = res.data
              this.zipcode = res.data[0].zipcode
              console.log(this.dataUser);
              this.consultarStatus()

            },
            (error) => {
              console.log('error buscando la referencia', error)
            }
          );

    }

    consultarStatus(){
        this.api.get(`estatus/show_estatus_manifiesto/${this.zipcode}`).subscribe(
            (res) => {
              this.statusPais = res.data
              console.log(this.statusPais);

            },
            (error) => {
              console.log('error buscando la referencia', error)
            }
          );
    }

    consultarCasillero(){
        //const loader:any = this.loadingFireToast('Consultando casillero, por favor espere...');
        this.api.get(`casillero/show/${this.codCasillero}`).subscribe(
            (res) => {
              console.log(res);
              console.log(this.casilleroSelected);

              //loader.close();
              if(this.casilleroSelected == res?.data[0].siglas){
                this.nombrecasillero = res.data[0].nombre
                this.codigoCliente = res.data[0].codcliente
                this.tipoCliente = 'CASILLERO INTERNACIONAL ZOOM'
                this.consultarCliente()
              }

            },
            (error) => {
              //loader.close();
              console.log('error buscando la referencia', error)
            }
          );
    }

    crearManifiesto(shipper:any){
        this.dialog.closeAll();
        this.shippers.forEach(ship => {
            if(ship.codshipper==shipper){
                this.shipperSelected = ship.nombre
            }
        })
        const fecha = moment().format('YYYY-MM-DD')
        var currentTime = new Date();

        const hora = currentTime.getHours()+':'+currentTime.getMinutes()
        const params = {
                nroreferencia: `${this.referencia}`,
                fecha: `${fecha}`,
                hora: `${hora}`,
                codtiposeg: "1",
                codshipper: `${shipper}`,
                codusuario: `${this.codUser}`
        }
        console.log(params);


        this.api.post('seguridad/create', params).subscribe(
            async (res) => {
                console.log(res);
              /* Swal.fire({
                title: 'Se creó correctamente',
                icon: 'success',
                confirmButtonColor: '#050506',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK',
              }).then(() => {

              }) */
            },
            (error) => {
              console.log('error enviando la observación', error);
            }
          );
    }

    goBack(){
        this.router.navigate(['/home'])
    }

    loadingFireToast(title:any) {
        return Swal.fire({
            title,
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })
    }
}
