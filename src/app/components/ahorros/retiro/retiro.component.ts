import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { generarGuid } from '../../../helpers/guid';
import { MovimientoDtoIn } from '../../../interfaces/movimiento-dto';
import { GastoService } from '../../../services/gasto.service';
import { MaterialModule } from '../../../modules/material/material.module';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-retiro',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './retiro.component.html',
  styleUrl: './retiro.component.css',
})
export class RetiroComponent {
  previsualizarTotal() {
    this.subtotal = this.ahorroDto?.balance - this.formGroup.value.cantidad;
  }

  guardar() {
    if (this.formGroup.valid) {
      let deposito: MovimientoDtoIn = {
        monto: this.formGroup.value.cantidad,
        concepto: this.formGroup.value.concepto,
        referencia: this.formGroup.value.referencia,
      };
      this.estaCargando = true;
      this.habilitarFormulario(false);
      this.servicio.ahorro.retirar(this.ahorroDto.id, deposito).subscribe({
        next: (data) => {
          //console.log(data);
          this.dialogRef.close(data);
        },
        error: (data) => {
          this.estaCargando = false;
          this.habilitarFormulario(true);
          console.log(data);
        },
      });
    }
  }

  habilitarFormulario(habilitar: boolean) {
    if (habilitar) {
      this.formGroup.get('cantidad')?.enable();
      this.formGroup.get('concepto')?.enable();
    } else {
      this.formGroup.get('cantidad')?.disable();
      this.formGroup.get('concepto')?.disable();
    }
  }

  formGroup: FormGroup;
  estaCargando = false;
  readonly ahorroDto = inject<AhorroDto>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<RetiroComponent>);
  subtotal = 0;

  constructor(
    private formBuilder: FormBuilder,
    private servicio: GastoService
  ) {
    console.log(this.ahorroDto);
    this.subtotal = this.ahorroDto?.balance;
    this.formGroup = this.formBuilder.group({
      referencia: generarGuid(),
      cantidad: ['', Validators.required],
      concepto: ['', Validators.required],
    });
  }
}
