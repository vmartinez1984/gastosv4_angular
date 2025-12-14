import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { generarGuid } from '../../../../helpers/guid';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../modules/material/material.module';
import { PagoTdcService } from '../../services/pago-tdc.service';
import { PagoDtoIn } from '../../interfaces/pago-dto';
import { CompraDto } from '../../interfaces/compra-dto';

@Component({
  selector: 'app-pagar-compra',
  imports: [ReactiveFormsModule, MaterialModule],
  templateUrl: './pagar-compra.component.html',
  styleUrl: './pagar-compra.component.css',
})
export class PagarCompraComponent {
  guardar() {
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.estaCargando = true;
      this.formGroup.disable();
      // Lógica para pagar la compra
      let pago: PagoDtoIn = {
        monto: this.formGroup.value.monto,
        nota: this.formGroup.value.nota,
        compraTdcIdEndodedkey: this.data.encodedkey,
        encodedkey: this.encodedkey,
      };
      //console.log(pago);
      this.servicio.realizarPago(pago).subscribe({
        next: (data) => {
          //console.log(data);
          this.estaCargando = false;
          data.pago = pago.monto;
          this.dialogRef.close(data);
        },
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private servicio: PagoTdcService
  ) {
    this.formGroup = this.formBuilder.group({
      monto: ['', [Validators.required]],
      nota: [''],
    });
  }

  formGroup: FormGroup;
  estaCargando = false;
  encodedkey = generarGuid();
  readonly dialogRef = inject(MatDialogRef<PagarCompraComponent>);
  readonly data = inject<CompraDto>(MAT_DIALOG_DATA);
}
