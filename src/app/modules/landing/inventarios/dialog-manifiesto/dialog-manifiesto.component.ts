import { Component, Inject, OnInit } from '@angular/core';
//import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ApiService } from '../../services/api.service'
import Swal from 'sweetalert2';

interface Shipping {
    codshipper: number;
    nombre: string;
  }

@Component({
  selector: 'app-dialog-manifiesto',
  templateUrl: './dialog-manifiesto.component.html',
  styleUrls: ['./dialog-manifiesto.component.scss']
})
export class DialogManifiestoComponent implements OnInit {

    /* form = new FormControl(''); */
    referencia:string;
    shipperSelect:any;
    selectedShipper: string;

  constructor(
    /* private fb: FormBuilder, */
    private dialogRef: MatDialogRef<DialogManifiestoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private api:ApiService
  ) {
    this.referencia = data.referencia;
  }

  ngOnInit(): void {
    this.api.get(`shipper/show_shippers`).subscribe(
        (res) => {
          console.log(res);
          this.shipperSelect = res.data
        },
        (error) => {
          console.log('error buscando la referencia', error)
        }
      );
   /*  this.form = this.fb.group({
        referencia: [this.referencia, []],
        shipper: ['', []],

    }); */

  }

    save() {
        const form = {
            referencia: this.referencia,
            shipper: this.selectedShipper
        }
        this.dialogRef.close(form);
    }

    clean(){
    this.selectedShipper = ''
    }

    close() {
        this.dialogRef.close();
    }

}
