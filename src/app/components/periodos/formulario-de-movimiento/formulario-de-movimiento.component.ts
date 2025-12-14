import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../modules/material/material.module';
import { GastoService } from '../../../services/gasto.service';
import { TransaccionDtoIn } from '../../../interfaces/transaccion-dto';
import { generarGuid } from '../../../helpers/guid';
import { DialogData } from '../detalle-de-periodo/detalle-de-periodo.component';

@Component({
  selector: 'app-formulario-de-movimiento',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario-de-movimiento.component.html',
  styleUrl: './formulario-de-movimiento.component.css',
})
export class FormularioDeMovimientoComponent {
  guardar() {
    if (this.formGroup.valid) {
      //console.log(this.formGroup.value)
      this.estaCargando = true;
      let transaccion: TransaccionDtoIn = {
        encodedKey: generarGuid(),
        presupuestoId: this.data.presupuesto.id,
        cantidad: this.formGroup.value.cantidad,
        nota: this.formGroup.value.nota,
      };
      this.estaCargando = true;
      this.formGroup.disable();
      this.servicio.periodo
        .agregarTransaccion(this.data.periodoId, transaccion)
        .subscribe({
          next: (data) => {
            data.cantidad = this.formGroup.value.cantidad;
            this.dialogRef.close(data);
          },
          error: (data) => {
            this.dialogRef.close(data);
          },
        });
    }
  }
  readonly dialogRef = inject(MatDialogRef<FormularioDeMovimientoComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  formGroup: FormGroup;
  estaCargando = false;
  readonly presupuesto = this.data.presupuesto;

  constructor(
    private formBuilder: FormBuilder,
    private servicio: GastoService
  ) {
    console.log(this.data);
    this.formGroup = this.formBuilder.group({
      cantidad: [
        0,
        [Validators.required, Validators.min(1), Validators.max(5000)],
      ],
      nota: [''],
    });
  }
}
