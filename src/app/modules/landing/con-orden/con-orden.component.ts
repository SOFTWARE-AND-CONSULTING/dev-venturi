import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogManifiestoComponent } from './dialog-manifiesto/dialog-manifiesto.component';
import { ApiService } from '../services/api.service'
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { DialogAggItemsComponent } from './dialog-agg-items/dialog-agg-items.component';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';

@Component({
    selector     : 'con-orden',
    templateUrl  : './con-orden.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ConOrdenComponent
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
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private dialog: MatDialog,
        public api: ApiService
        )
    {
    }

    ngOnInit(): void{
       this.codUser = localStorage.getItem('codusuario');

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
                codguiaprealertdetalle: `${this.prealertData ? (this.prealertData[0].codguiaprealertdetalle!=null ? this.prealertData[0].codguiaprealertdetalle : '1')  : '1'}`,
                referencia: `${this.referencia}`,
                codcasillero: `${this.casillero[0].codcasillero}`,
                descripcion: `${this.itemSelected[index]?.descripcionpais}`,
                valordeclarado: `${this.valorGlobal}`,
                cantidaditem: `${this.dataItemSelect.length}`,
                anulada: "f",
                fechacre: `${this.prealertData ? (this.prealertData[0].fechacredetalle!= null ? this.prealertData[0].fechacredetalle : fecha) : fecha}`,
                codtipoprealertmod: `${this.prealertData ? (this.prealertData[0].fechacredetalle=!null ? this.prealertData[0].fechacredetalle : fecha) : fecha}`,
                fechamod:  `${fecha}`,
                codguiaprealertdetext: `${this.prealertData ? (this.prealertData[0].codguiaprealertdetext != 0 ? this.prealertData[0].codguiaprealertdetext : codguia) : codguia}`
            })
            descriptionItems = descriptionItems+`${this.itemSelected[index]?.descripcionpais}, `

        })

        const params = {
            codciudadoriope: `${this.dataUser[0].codciudadcon}`,
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
            direcciondes: `${this.casillero[0].codcasillero}`,
            contactodes: `${this.casillero[0].nombre}`,
            codciudaddes: `${this.dataUser[0].codciudadcon}`,
            telefonodes: "0412-6098042",
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
            codservicio: `${this.casillero[0].codservicio}`,
            codpaisdes: `${this.casillero[0].codcasillero}`,
            codtipopag: "1",
            referencia: `${this.referencia}`,
            codoficinaope: `${this.casillero[0].codoficina}`,
            descuentoemp: "f",
            codestatus: `${this.statusSelected}`,
            descripcioncon: descriptionItems, //concatenación de los item  descripcion país
            anulada: "f",
            cortesia: "f",
            codusuario: `${this.codUser}`,//
            codestaciondes: `${this.casillero[0].codoficina}`,
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
            codshipper: `${this.creacionManifiesto}`,
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
            codproducto: `${this.itemSelected[0].codigodescripcionpais}`,
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
            nombredestino: `${this.casillero[0].nombre}`,
            telefonodestino: "0",
            ciudaddestino: "0",
            paisdestino: "VENEZUELA",
            codpaisori:"1",
            siglaspaisdes: "VE",
            zipcode: "0",
            suburbs: "0",
            codcasillero: `${this.casillero[0].siglas}${this.casillero[0].codcasillero}`,
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
            email: `${this.casillero[0].mail}`,
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

    traerProcesos(){
        console.log(this.unidad)
        this.api.get(`estatus/show_proceso/${this.unidad}`).subscribe(
            (res) => {
              this.procesos = res.data
              console.log(this.procesos);

            },
            (error) => {
              console.log('error buscando el proceso', error)
            }
          );
    }

    traerSubProcesos(){
        console.log(this.proecesoSelected)
        this.api.get(`estatus/show_subproceso/${this.unidad}/${this.proecesoSelected}`).subscribe(
            (res) => {
              this.subProcesos = res.data
              console.log(this.subProcesos);

            },
            (error) => {
              console.log('error buscando el sub-proceso', error)
            }
          );
    }

    traerStatus(){
        console.log(this.subProcesoSelected)
        this.api.get(`estatus/show_arbolestatus/${this.unidad}/${this.proecesoSelected}/${this.subProcesoSelected}`).subscribe(
            (res) => {
              this.estatus = res.data
              console.log(this.estatus);

            },
            (error) => {
              console.log('error buscando el sub-proceso', error)
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
              this.casilleroSelected = res.data[0].siglas
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
                        console.log(this.itemSelectedList, 'false')
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
        console.log(this.itemSelectedList)
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
        this.dataItemSelect = this.dataItemSelect.filter(el => el.description !==this.itemSelectedList.description)
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
