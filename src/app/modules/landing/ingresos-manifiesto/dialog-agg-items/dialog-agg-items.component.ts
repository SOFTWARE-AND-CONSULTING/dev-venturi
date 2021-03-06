import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-agg-items',
  templateUrl: './dialog-agg-items.component.html',
  styleUrls: ['./dialog-agg-items.component.scss']
})
export class DialogAggItemsComponent implements OnInit {
    categoriaSelected:any;
    categorias: any;
    filtroProducto:any;
    noPiezas:any;
    descripcion:any;
    valor:any;
    displayedColumns: string[] = ['select', 'idproductocategoriadetalle', 'nombre', 'descripcionpais'];
    selection = new SelectionModel<any>(true, []);
    categoriasDetalle: any;
    itemSelected: any;
    valorGlobal: any;
    itemOtro: any;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogAggItemsComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) {
    this.valorGlobal = data.valorGlobal;
    this.itemOtro = data.otro;
    this.noPiezas = data?.no;
    this.descripcion = data?.description;
    this.valor = data?.value;
    this.categoriaSelected = data?.idCategoria
   }

  ngOnInit(): void {
        console.log(this.valorGlobal, this.itemOtro, this.valor, this.descripcion, this.noPiezas);


     /* Traer categorías */
     this.api.get(`producto/show_productocategorias`).subscribe(
        (res) => {
          this.categorias = res.data
          console.log(this.categorias);
          if(this.categoriaSelected){
            this.buscarCategoria()
        }

        },
        (error) => {
          console.log('error trayendo las cateogorías', error)
        }
      );
  }

  filtroProduct(){
    this.categoriasDetalle.filter(categoria => categoria.nombre.toLowerCase() === this.filtroProducto.toLowerCase());
  }

  save() {
      if(this.noPiezas==undefined || this.noPiezas == ''){
        Swal.fire({
            title: 'El Nro de pieza es obligatorio',
            icon: 'info',
            confirmButtonColor: '#050506',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
          })
      }else if(this.valor==undefined || this.valor == ''){
        Swal.fire({
            title: 'El valor es obligatorio',
            icon: 'info',
            confirmButtonColor: '#050506',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
          })
      }else if(Number(this.itemOtro) < (Number(this.valor)+Number(this.valorGlobal))){
        Swal.fire({
            title: 'El valor digitado supera el valor global',
            icon: 'info',
            confirmButtonColor: '#050506',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK',
          })
      }else{
        const form = [
            {   no: this.noPiezas,
                description: this.descripcion,
                value: this.valor,
                idCategoria: this.categoriaSelected

            },
            this.itemSelected
        ]

        this.dialogRef.close(form);
      }

    }

    clean(){
        this.categoriasDetalle.forEach(categoria => categoria.selected = false);
        this.selection.clear();
        this.itemSelected = null;
        this.valor = null;
        this.noPiezas = null;
        this.descripcion =null;
    }

    close() {
        this.dialogRef.close();
    }



    buscarCategoria(){
        if(this.filtroProducto){
            this.api.get(`producto/show_productocategoriadetalles/${this.categoriaSelected}`).subscribe(
                (res) => {
                    this.categoriasDetalle = res.data.filter((c:any) => c.nombre.toLowerCase().includes(this.filtroProducto.toLowerCase()));
                    this.categoriasDetalle.selected = false
                    console.log(this.categoriasDetalle);

                },
                (error) => {
                    console.log('error trayendo las cateogorías', error)
                }
                );

        }else{
            this.api.get(`producto/show_productocategoriadetalles/${this.categoriaSelected}`).subscribe(
                (res) => {
                    this.categoriasDetalle = this.descripcion ? res.data.filter((c:any) => c.nombre.toLowerCase().includes(this.descripcion.toLowerCase())) : res.data;
                    this.categoriasDetalle.selected = this.descripcion ? true : false
                    console.log(this.categoriasDetalle);

                },
                (error) => {
                    console.log('error trayendo las cateogorías', error)
                }
                );
        }

    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.categoriasDetalle?.length;
        return numSelected === numRows;
      }

    masterToggle() {
        if (this.isAllSelected()) {
          this.selection.clear();
          return;
        }

        this.selection.select(...this.categoriasDetalle);

      }

      itemSelectedCheck(row:any){


            this.itemSelected = row;
            this.descripcion = this.itemSelected.nombre;


      }

      /** The label for the checkbox on the passed row */
      checkboxLabel(row?: any): string {


        if (!row) {
          return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }else{


            return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
        }

      }

}
