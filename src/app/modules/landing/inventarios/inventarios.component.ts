import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogManifiestoComponent } from './dialog-manifiesto/dialog-manifiesto.component';
import { ApiService } from '../services/api.service'
import Swal from 'sweetalert2';
import * as moment from 'moment';
import axios from "axios";
import { DialogAggItemsComponent } from './dialog-agg-items/dialog-agg-items.component';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';

type itemList = [no?:string, description?:string, value?:string];
var mediaqueryList = window.matchMedia("(max-width: 700px)");
@Component({
    selector     : 'inventarios',
    templateUrl  : './inventarios.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InventariosComponent
{
    @ViewChild("myInput") inputEl: ElementRef;
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
    itemSelected: Array<any> = [];
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
    //--------
    unidades: any;
    unidad:any;
    proecesoSelected:any;
    procesos: any;
    subProcesoSelected:any;
    subProcesos: any;
    estatusSelected
    estatus: any;
    itemSelectedList:any = [];
    selectAll:boolean=false;
    ipCliente: any;
    sumatoriaItems: number = 0;
    horizontalPosition : MatSnackBarHorizontalPosition = 'start' ;
    verticalPosition: MatSnackBarVerticalPosition = 'top' ;
    codGuia: any;
    codGuiaPre: any;
    internacional: string;
    mobile: boolean=false;
    guiaRadicado: any;
    codguiaprealertdetalle: any;
    prealertDataGuia: any;
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private dialog: MatDialog,
        public api: ApiService,
        private _snackBar: MatSnackBar,
        )
    {
    }

    ngOnInit(): void{
        this.manejador(mediaqueryList);
       mediaqueryList.addEventListener('change',this.manejador);
       this.codUser = localStorage.getItem('codusuario');
       this.getIpClient();
       var currentTime = new Date();
       console.log(currentTime.toString())
       const hora = (currentTime.getHours() < 10 ? 0 + `${currentTime.getHours()}` : currentTime.getHours()) +':'+ (currentTime.getMinutes() < 10 ? 0 + `${currentTime.getMinutes()}` : currentTime.getMinutes())+':'+ (currentTime.getSeconds() < 10 ? 0 + `${currentTime.getSeconds()}` : currentTime.getSeconds());
       console.log(hora)
       /* Traer casilleros */
       this.api.get(`estatus/show_unidad`).subscribe(
        (res) => {
          this.unidades = res.data
          console.log(this.unidades);

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
          console.log('error buscando la unidad', error)
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

    manejador(EventoMediaQueryList) {

        if(EventoMediaQueryList.matches) {
          this.mobile = true;

        } else {
          this.mobile = false;
        }

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
        let items:any = []
        let descriptionItems:string='';
        const fecha = moment().format('YYYY-MM-DD')
        var currentTime = new Date();
        console.log(this.dataItemSelect,this.itemSelected, this.prealertData)
        this.dataItemSelect.forEach((item) => {
           this.noPiezas = this.noPiezas+ Number(item.no)})
        const hora = (currentTime.getHours() < 10 ? 0 + `${currentTime.getHours()}` : currentTime.getHours()) +':'+ (currentTime.getMinutes() < 10 ? 0 + `${currentTime.getMinutes()}` : currentTime.getMinutes())+':'+ (currentTime.getSeconds() < 10 ? 0 + `${currentTime.getSeconds()}` : currentTime.getSeconds());
        console.log(hora)
        const codguia = this.randomInteger(8);
        this.dataItemSelect.forEach((item:any, index) => {
            items.push(
            {
                codguiaprealertdetalle: `${this.codguiaprealertdetalle[index].codguiaprealertdetalle}`,
                referencia: `${this.referencia}`,
                codcasillero: `${this.codCasillero}`,
                descripcion: `${this.itemSelected[index]?.descripcionpais}`,
                valordeclarado: `${this.valorGlobal}`,
                cantidaditem: `${this.dataItemSelect.length}`,
                anulada: "f",
                fechacre: `${this.codguiaprealertdetalle[index].fechacredetalle}`,
                codtipoprealertmod: `${this.codguiaprealertdetalle[index].codtipoprealertmoddetalle}`,
                fechamod:  `${fecha}`,
                codguiaprealertdetext: `${this.codguiaprealertdetalle[index].codguiaprealertdetext}`
            })
            descriptionItems = descriptionItems+`${this.itemSelected[index]?.descripcionpais}, `

        })

        const params = {
            codguia:`${this.codGuiaPre}`,
            codciudadoriope: `${this.prealertDataGuia.Guia.codciudadoriope}`,
            fecha: `${fecha}`,
            fechapro: `${fecha}`,
            codoficinaori: `${this.prealertDataGuia.Guia.codoficinaori}`,
            codoficinades: `${this.prealertDataGuia.Guia.codoficinades}`,
            contactorem: `${this.prealertDataGuia.Guia.contactorem}`,
            direccionrem: `${this.prealertDataGuia.Guia.direccionrem}`,
            telefonorem: "1",
            codcliente: `${this.prealertDataGuia.Guia.codcliente}`,
            coddestinatario: `${this.prealertDataGuia.Guia.coddestinatario}`,
            destinatario: `${this.prealertDataGuia.Guia.destinatario}`,
            direcciondes: `${this.prealertDataGuia.Guia.direcciondes}`,
            contactodes: `${this.prealertDataGuia.Guia.contactodes}`,
            codciudaddes: `${this.prealertDataGuia.Guia.codciudaddes}`,
            telefonodes: "1",
            codtipoenv: "2",//
            numeropie: "1",
            pesovol: `${this.volumenitems}`,
            pesobru: `${this.pesoitems}`,
            basicoori: "0",
            sobrepesoori: "0",
            subtotori: "0",
            otrosori: `${this.otrosItem}`,
            totalpag: `${this.totalFactura}`,
            mercancia:  `${this.totalFactura}`, // es el valor de total factura
            codservicio: `${this.prealertDataGuia.Guia.codservicio}`,
            codpaisdes: `${this.prealertDataGuia.Guia.codpaisdes}`,
            codtipopag: "1",
            referencia: `${this.referencia}`,
            codoficinaope: `${this.prealertDataGuia.Guia.codoficinaope}`,
            descuentoemp: "f",
            codestatus: `${this.estatusSelected}`,
            descripcioncon: descriptionItems, //concatenación de los item  descripcion país
            anulada: "f",
            cortesia: "f",
            codusuario: `${this.codUser}`,//
            codestaciondes: `${this.prealertDataGuia.Guia.codestaciondes}`,
            descuento: "0",
            fechaing: `${fecha}`,
            costobas: "0",
            costoadi: "0",
            ciudaddesint: "0",
            codmanifiesto: "0",
            largo: `${this.altoitems}`,
            ancho: `${this.anchoitems}`,
            alto: `${this.largoitems}`,
            dimensiones: `${this.anchoitems}x${this.largoitems}x${this.altoitems}`,
            codshipper: `${this.prealertDataGuia.Guia.codshipper}`,
            direccionip: this.ipCliente,
            codagente: "0",
            cantidad25: "0",
            otrosdes: "0",
            totalestatuspro: "0",
            codruta: "0",
            observacion: `${this.description}`,
            codtipopes: "2",
            hora: "0",
            horareal: `${hora}`,
            fechahorareal: "0",
            casilleroexcento: "f",
            guiaelectronica: "f",
            nummedioskilos: "6",
            subtotal: "8",
            seguro: "5",
            otros: `${this.otrosItem}`,
            total: `${this.totalFactura}`,
            fechamod: `${fecha}`,
            codguiadet: "0",
            basico: "12",
            adicional: "2",
            codproducto: `${this.prealertDataGuia.Guia.guiaguidet[0].codproducto}`,
            descuentobas: "0",
            descuentosob: "0",
            tipocarga: `${this.tipoEnvio}`,
            gastosaduanal: "0",
            tiporef: "0",
            nomcliente: "0",
            tlfemisor: "NULL",
            direccionemisor: "0",
            ciudademisor: "0",
            paisorigen: "VENEZUELA",
            siglaspaisori: "VE",
            direcciondestino: "0",
            companiadestino: "0",
            nombredestino: `${this.prealertDataGuia.guiaprealert.nombredestino}`,
            telefonodestino: "0",
            ciudaddestino: "0",
            paisdestino: "VENEZUELA",
            codpaisori:"1",
            siglaspaisdes: "VE",
            zipcode: "0",
            suburbs: "0",
            codcasillero: `${this.prealertDataGuia.guiaprealert.codcasillero}`,
            npiezas: `${this.noPiezas}`,
            pesob: "0.75",
            depth: "0",
            descripcion: descriptionItems, // concatenacion de todos los items
            valordeclarado: `${this.valorGlobal}`,
            cantidadasegurada: `${this.noPiezas}`,
            tiposeguro: "Y",
            tipoenv: "P",
            retenido: "f",
            generic1: "0",
            generic2: "0",
            generic3: "0",
            procesado: "f",
            codguiazoom: `${codguia}`,
            tipoprealert: "1",
            taxid: "NULL",
            email: `${this.prealertDataGuia.guiaprealert.email}`,
            cantidaditem: `${this.dataItemSelect.length}`,
            valordeclaradoglobal: `${this.valorGlobal}`,
            nomvendedor: "0",
            repacking: "f",
            nombrearc: "0",
            tipo_tarifa: "90",
            fechasync: `${fecha}`,
            codguiadhl: "0",
            cuentadhl: "0",
            detalleprealert: items



        }
        console.log(params)
        this.api.post('inventario/create/', params).subscribe(
            async (res) => {
                console.log(res);

                if (!res.status) {
                    this._snackBar.open(`${res.message ? res.message : res.messageval}`, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: 4000,
                      })
                      this.inputEl.nativeElement.focus()
                }else{

                    this.guiaRadicado = res.data;
                    this._snackBar.open(`Se creó el invetario de la guia ${this.guiaRadicado} correctamente!!`, '', {
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                        duration: 4000,
                      });
                      this.inputEl.nativeElement.focus()
                        this.nombrecasillero = null;
                        this.codigoCliente = null;
                        this.creacionManifiesto = null;
                        this.shipperSelected = null;
                        this.proveedorSelected = null;
                        this.casilleroSelected === undefined
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
                        this.prealertData = null;
                        this.codGuiaPre = null;
                        this.proecesoSelected = null;
                        this.subProcesoSelected = null;
                        this.estatusSelected = null;
                        this.codGuia = null;
                        this.codCasillero =  null;
                        this.nombrecasillero = null;
                        this.internacional = null;
                        this.unidad = null;


                }

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
            valorGlobal: this.sumatoriaItems,
            otro: this.totalFactura
        };

        this.dialog.open(DialogAggItemsComponent, dialogConfig);

        const dialogRef = this.dialog.open(DialogAggItemsComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
                console.log(data);


                if(data != undefined){
                    this.sumatoriaItems = this.sumatoriaItems + Number(data[0].value)
                    data[0].selected = false;
                    this.dataItemSelect.push(data[0]);
                    this.itemSelected.push(data[1])
                    this.sumaItems = this.dataItemSelect.length
                    console.log(this.dataItemSelect, this.itemSelected);
                    this.dialog.closeAll();

                }else{
                    this.dialog.closeAll();
                }


            }
        );
    }

    sumarTotal(){
        this.tipoEnvio= null
       this.totalFactura=  this.otrosItem + this.valorGlobal;
       this.tipoEnvio =this.totalFactura >100 ? 'MAV' : 'MBV';

       console.log(this.tipoEnvio)
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

    traerProcesos(){
        this.api.get(`estatus/show_proceso/${this.unidad}`).subscribe(
            (res) => {
              this.procesos = res.data

            },
            (error) => {
              console.log('error buscando los procesos', error)
            }
          );
    }

    traerSubProcesos(){
        this.api.get(`estatus/show_subproceso/${this.unidad}/${this.proecesoSelected}`).subscribe(
            (res) => {
              this.subProcesos = res.data

            },
            (error) => {
              console.log('error buscando los procesos', error)
            }
          );
    }

    traerStatus(){
        this.api.get(`estatus/show_arbolestatus/${this.unidad}/${this.proecesoSelected}/${this.subProcesoSelected}`).subscribe(
            (res) => {
              this.estatus = res.data

            },
            (error) => {
              console.log('error buscando los procesos', error)
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

    consultarGuia(){


        //const loader:any = this.loadingFireToast('Consultando casillero, por favor espere...');
        this.api.get(`inventario/show/${this.codGuia}`).subscribe(
            (res) => {
            console.log(res);
            this.prealertDataGuia = res.dataprealert
            this.codGuiaPre = res.dataprealert?.Guia.codguia;
            this.codCasillero = res.dataprealert?.guiaprealert.codcasillero;
            this.internacional = "CASILLERO INTERNACIONAL ZOOM";
            this.nombrecasillero = res.dataprealert?.guiaprealert.nombredestino;
            this.valorGlobal = res.dataprealert?.guiaprealert.valordeclaradoglobal;
            this.sumaItems = res.dataprealert?.guiaprealert.cantidaditem;
            this.otrosItem = res.dataprealert?.Guia.otrosori;
            this.totalFactura = res.dataprealert?.Guia.totalpag;
            this.tipoEnvio = res.dataprealert.guiaprealert.tipoenv;
            this.pesoitems = res.dataprealert.Guia.pesobru;
            this.altoitems = res.dataprealert.Guia.alto;
            this.anchoitems = res.dataprealert.Guia.ancho;
            this.largoitems = res.dataprealert.Guia.largo;
            this.volumenitems = res.dataprealert.Guia.pesovol;
            this.description = res.dataprealert.Guia.observacion;
            res.dataprealert.guiaprealert.guiaprealertdet.forEach((item:any, index:any) => {
                if(index<=1){
                    this.dataItemSelect.push({
                        no:item.cantidaditem,
                        description: item.descripcion,
                        value: item.valordeclarado
                    });
                    this.itemSelected.push({
                        descripcionpais: item.descripcion
                    })
                }else{
                    return
                }


            })
            this.referencia = res.dataprealert.Guia.referencia
            this.codguiaprealertdetalle =  res.dataprealert.guiaprealert.guiaprealertdet


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

    calcularVolumen(){
        this.volumenitems = null;
        this.volumenitems = this.altoitems * this.anchoitems * this.largoitems;
    }

    cerrarSideBar(){
        this.api.sidebar = !this.api.sidebar
    }
    verifyItemSelected(tipo:any, itemSelected:any){
        if(tipo==2){
            this.dataItemSelect.forEach(c=>{
                if(c.description===itemSelected.description){
                    console.log(c.selected)
                    if(c.selected){
                        if(this.itemSelectedList?.length == 0){
                            this.itemSelectedList.push(c)
                        }else{
                            this.itemSelectedList.forEach(async(el:any) => {
                                if(el.description===c.description){
                                    return
                                }else{
                                    this.itemSelectedList.push(c)
                                }

                            });
                        }

                    }else{
                        this.itemSelectedList = this.itemSelectedList.filter((con:any) => con.description!==c.description)
                        console.log(this.itemSelectedList, 'false')
                    }

                }
            }
                );
                console.log(this.itemSelectedList, this.dataItemSelect)

          }else if(tipo==1){
            console.log(this.selectAll);
            this.dataItemSelect.forEach(async(c:any)=>{
                    c.selected = this.selectAll ? true : false;
                    this.selectAll ? this.itemSelectedList.push(c) : this.itemSelectedList = [];
              })
              console.log(this.itemSelectedList);
          }
    }

    modifyItem(){

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        dialogConfig.data = {
            id: 1,
            valorGlobal: this.valorGlobal,
            otro: this.totalFactura,
            no: this.itemSelectedList[0].no,
            description: this.itemSelectedList[0].description,
            value: this.itemSelectedList[0].value,
            idCategoria: this.itemSelectedList[0].idCategoria,
        };
        this.dataItemSelect = this.dataItemSelect.filter(el => el.description !==this.itemSelectedList[0].description)
        console.log(this.dataItemSelect)
        this.dialog.open(DialogAggItemsComponent, dialogConfig);

        const dialogRef = this.dialog.open(DialogAggItemsComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(
            data => {
                console.log(data);


                if(data != undefined){
                    this.totalFactura = Number(this.totalFactura) + Number(data[0].value)
                    this.dataItemSelect.push(data[0]);
                    this.itemSelected.push(data[1])
                    this.sumaItems = this.dataItemSelect.length
                    console.log(this.dataItemSelect);
                    this.dialog.closeAll();

                }else{
                    this.dialog.closeAll();
                }


            }
        );
    }

    deleteItem(){
        if(this.selectAll){
            /* this.itemSelectedList.forEach(el => {
                this.totalFactura = this.totalFactura - Number(el.value)
            }) */
            this.dataItemSelect = [];
            this.itemSelectedList = []
            this.selectAll=false;

        }else {
            this.itemSelectedList.forEach(el => {
                //this.totalFactura = this.totalFactura - Number(el.value),
                this.dataItemSelect= this.dataItemSelect.filter(c => c !== el)
                console.log(this.dataItemSelect)
                this.selectAll=false;

            })

        }
    }

    async getIpClient() {
        try {
          const response = await axios.get('https://api.ipify.org?format=json');

          this.ipCliente = response.data.ip
          console.log(this.ipCliente);
        } catch (error) {
          console.error(error);
        }
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
