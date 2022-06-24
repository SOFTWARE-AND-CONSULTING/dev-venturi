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
    selector     : 'inventarios',
    templateUrl  : './inventarios.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InventariosComponent
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
    casillero: any;
    description: any;
    noPiezas: number=0;
    prealertData: any;
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

    limpiarForm(){
        this.nombrecasillero = null;
        this.codigoCliente = null;
        this.creacionManifiesto = null;
        this.shipperSelected = null;
        this.proveedorSelected = null;
        this.casilleroSelected = null;
        this.codCasillero    = null;
        this.nombrecasillero= null;
        this.tipoCliente= null;
        this.valorGlobal= null;
        this.sumaItems= null;
        this.otrosItem= null;
        this.totalFactura= null;
        this.tipoEnvio= null;
        this.pesoitems= null;
        this.altoitems= null;
        this.anchoitems= null;
        this.largoitems= null;
        this.volumenitems= null;
        this.dataItemSelect =[];
        this.description = null;
        this.statusSelected = null;
        this.referencia= null;
    }
    randomInteger(n:any) {
        return Math.floor(Math.pow(10, n-1) + Math.random() * (Math.pow(10, n) - Math.pow(10, n-1) - 1));
      }

    crearManifiestoForm(){
        const fecha = moment().format('YYYY-MM-DD')
        var currentTime = new Date();
        this.dataItemSelect.forEach((item) => {
           this.noPiezas = this.noPiezas+ Number(item.no)})
        const hora = currentTime.getHours()+':'+currentTime.getMinutes()+':'+currentTime.getSeconds()
        const codguia = this.randomInteger(8);
        const params = {
            codguia: '98765489',
            codciudadoriope: "424",
            fecha: `${fecha}`,
            fechapro: `${fecha}`,
            codoficinaori: `${this.dataUser[0].codoficina}`,
            codoficinades: `${this.dataUser[0].codoficina}`,
            contactorem: `${this.dataUser[0].nombre}`,
            direccionrem: `${this.dataUser[0].direccionobl}`,
            telefonorem: "0412-6098042",
            codcliente: `${this.dataUser[0].codcliente}`,
            coddestinatario: `${this.casillero[0].codcasillero}`,
            destinatario: `${this.casillero[0].siglas}${this.casillero[0].codcasillero}`,
            direcciondes: `${this.casillero[0].direccionobl}`,
            contactodes: `${this.casillero[0].nombre}`,
            codciudaddes: `${this.dataUser[0].codciudadcon}`,
            telefonodes: "0412-6098042",
            codtipoenv: `${this.tipoEnvio}`,
            numeropie: "1",
            pesovol: `${this.volumenitems}`,
            pesobru: `${this.pesoitems}`,
            basicoori: "0",
            sobrepesoori: "0",
            subtotori: "0",
            otrosori: `${this.otrosItem}`,
            totalpag: `${this.totalFactura}`,
            mercancia: `${this.itemSelected.idproductocategoriadetalle}`,
            codservicio: `${this.casillero[0].codservicio}`,
            codpaisdes: `${this.itemSelected.codigodescripcionpais}`,
            codtipopag: "1",
            referencia: `${this.referencia}`,
            codoficinaope: `${this.casillero[0].codoficina}`,
            descuentoemp: "f",
            codestatus: `${this.statusSelected}`,
            descripcioncon: `${this.itemSelected.descripcionpais}`,
            anulada: "f",
            cortesia: "f",
            codusuario: `${this.codUser}`,
            codestaciondes: `${this.casillero[0].codoficina}`,
            descuento: "0",
            fechaing: `${fecha}`,
            costobas: "0",
            costoadi: "0",
            ciudaddesint: "NULL",
            codmanifiesto: "0",
            largo: `${this.altoitems}`,
            ancho: `${this.anchoitems}`,
            alto: `${this.largoitems}`,
            dimensiones: `${this.anchoitems}x${this.largoitems}x${this.altoitems}`,
            codshipper: `${this.creacionManifiesto}`,
            direccionip: "",
            codagente: "0",
            cantidad25: "0",
            otrosdes: "0",
            totalestatuspro: "0",
            codruta: "0",
            observacion: `${this.description}`,
            codtipopes: "2",
            hora: "NULL",
            horareal: `${hora}`,
            fechahorareal: "NULL",
            casilleroexcento: "f",
            guiaelectronica: "f",
            nummedioskilos: "6",
            subtotal: "8",
            seguro: "5",
            otros: `${this.otrosItem}`,
            total: `${this.totalFactura}`,
            fechamod: "",
            codguiadet: "",
            basico: "12",
            adicional: "2",
            codproducto: `${this.itemSelected.idproductocategoriadetalle}`,
            descuentobas: "0",
            descuentosob: "0",
            tipocarga: "MBV",
            gastosaduanal: "0",
            tiporef: "NULL",
            nomcliente: "NULL",
            tlfemisor: "NULL",
            direccionemisor: "NULL",
            ciudademisor: "NULL",
            paisorigen: "VENEZUELA",
            siglaspaisori: "VE",
            direcciondestino: "NULL",
            companiadestino: "NULL",
            nombredestino: `${this.casillero[0].nombre}`,
            telefonodestino: `${this.casillero[0].telefonoobl}`,
            ciudaddestino: "NULL",
            paisdestino: "VENEZUELA",
            codpaisori:"1",
            siglaspaisdes: "VE",
            zipcode: "NULL",
            suburbs: "NULL",
            codcasillero: `${this.casillero[0].siglas}${this.casillero[0].codcasillero}`,
            npiezas: `${this.noPiezas}`,
            pesob: "0.75",
            depth: "0",
            descripcion: `${this.itemSelected.descripcionpais}`,
            valordeclarado: `${this.valorGlobal}`,
            cantidadasegurada: `${this.noPiezas}`,
            tiposeguro: "Y",
            tipoenv: "P",
            retenido: "f",
            generic1: "NULL",
            generic2: "NULL",
            generic3: "NULL",
            procesado: "f",
            codguiazoom: "",
            tipoprealert: "1",
            taxid: "NULL",
            email: `${this.casillero[0].mail}`,
            cantidaditem: `${this.dataItemSelect.length}`,
            valordeclaradoglobal: `${this.valorGlobal}`,
            nomvendedor: "NULL",
            repacking: "f",
            nombrearc: "NULL",
            tipo_tarifa: "90",
            fechasync: "",
            codguiadhl: "NULL",
            cuentadhl: "0",
            detalleprealert: [
                {
                    codguiaprealertdetalle: `${this.prealertData ? this.prealertData.codguiaprealertdetalle : ''}`,
                    referencia: `${this.referencia}`,
                    codcasillero: `${this.casillero[0].codcasillero}`,
                    descripcion: `${this.itemSelected.descripcionpais}`,
                    valordeclarado: `${this.valorGlobal}`,
                    cantidaditem: `${this.dataItemSelect.length}`,
                    anulada: "f",
                    fechacre: `${this.prealertData ? this.prealertData.fechacredetalle : ''}`,
                    codtipoprealertmod: `${this.prealertData ? this.prealertData.fechacredetalle : ''}`,
                    fechamod: "",
                    codguiaprealertdetext: `${this.prealertData ? this.prealertData.codguiaprealertdetext : ''}`
                }
            ]
        }

        this.api.post('ingresomanifiesto/create', params).subscribe(
            async (res) => {
                console.log(res);
              Swal.fire({
                title: 'Se creó el manifiesto correctamente',
                icon: 'success',
                confirmButtonColor: '#050506',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK',
              }).then(() => {
                this.nombrecasillero = null;
                this.codigoCliente = null;
                this.creacionManifiesto = null;
                this.shipperSelected = null;
                this.proveedorSelected = null;
                this.casilleroSelected = null;
                this.codCasillero    = null;
                this.nombrecasillero= null;
                this.tipoCliente= null;
                this.valorGlobal= null;
                this.sumaItems= null;
                this.otrosItem= null;
                this.totalFactura= null;
                this.tipoEnvio= null;
                this.pesoitems= null;
                this.altoitems= null;
                this.anchoitems= null;
                this.largoitems= null;
                this.volumenitems= null;
                this.dataItemSelect =[];
                this.description = null;
                this.statusSelected = null;
                this.referencia= null;
              })
            },
            (error) => {
              console.log('error creando el manifiesto', error);
            }
          );

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
                    this.sumaItems = this.dataItemSelect.length
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
        this.nombrecasillero = null;
        this.codigoCliente = null;
        this.creacionManifiesto = null;
        this.shipperSelected = null;
        this.proveedorSelected = null;
        this.casilleroSelected = null;
        this.codCasillero    = null;
        this.nombrecasillero= null;
        this.tipoCliente= null;
        this.valorGlobal= null;
        this.sumaItems= null;
        this.otrosItem= null;
        this.totalFactura= null;
        this.tipoEnvio= null;
        this.pesoitems= null;
        this.altoitems= null;
        this.anchoitems= null;
        this.largoitems= null;
        this.volumenitems= null;
        this.dataItemSelect =[];
        this.description = null;
        this.statusSelected = null;
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
        this.api.get(`prealertreferencia/show/${this.referencia}`).subscribe(
            (res) => {
              console.log(res);
                this.prealertData = res.data
                this.shipperSelected = res.data[0].nomcliente
                const proveedor = this.proveedores.filter(p => p.nombre==res.data[0].companiadestino)
                console.log(proveedor);

                this.proveedorSelected = proveedor.codproveedor


                /* const casillero = this.casilleros.filter(c => c.nombre==res.data[0].codcasillero.slice(0, 3))
                console.log(casillero); */
                this.casilleroSelected = res.data[0].codcasillero.slice(0, 3)
                this.codCasillero = res.data[0].codcasillero.slice(3);
                this.consultarCasillero()
                this.tipoCliente = 'CASILLERO INTERNACIONAL ZOOM';
                /* if(casillero.length !=0){
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
                } */





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
        console.log(this.codCasillero);

        //const loader:any = this.loadingFireToast('Consultando casillero, por favor espere...');
        this.api.get(`casillero/show/${this.codCasillero}`).subscribe(
            (res) => {
              console.log(res);
              console.log(this.casilleroSelected);

              //loader.close();
              this.casillero = res.data
                this.nombrecasillero = res.data[0].nombre
                this.codigoCliente = res.data[0].codcliente
                this.tipoCliente = 'CASILLERO INTERNACIONAL ZOOM'
                this.consultarCliente()
              /* if(this.casilleroSelected == res?.data[0].siglas){
                this.nombrecasillero = res.data[0].nombre
                this.codigoCliente = res.data[0].codcliente
                this.tipoCliente = 'CASILLERO INTERNACIONAL ZOOM'
                this.consultarCliente()
              } */

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

    goTo(url) {
        this.router.navigate([url]);
    }
}
