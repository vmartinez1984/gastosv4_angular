import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PresupuestoDelPeriodoDto } from '../../../interfaces/presupuesto-del-periodo-dto';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../modules/material/material.module';
import { GastoService } from '../../../services/gasto.service';
import { TransaccionDtoIn } from '../../../interfaces/transaccion-dto';
import { generarGuid } from '../../../helpers/guid';

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
    ReactiveFormsModule
  ],
  templateUrl: './formulario-de-movimiento.component.html',
  styleUrl: './formulario-de-movimiento.component.css'
})
export class FormularioDeMovimientoComponent {
  guardar() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
      this.estaCargando = true
      let transaccion: TransaccionDtoIn = {
        cantidad: this.formGroup.value.cantidad,
        encodedKey: generarGuid(),
        presupuestoId: this.presupuesto.presupuestoId
      }
      this.servicio.periodo.agregarTransaccion(this.presupuesto.periodoId, transaccion).subscribe({
        next:(data)=>{

        },
        error:(data)=>{
          
        }
      })
    }
  }
  readonly dialogRef = inject(MatDialogRef<FormularioDeMovimientoComponent>)
  readonly presupuesto = inject<PresupuestoDelPeriodoDto>(MAT_DIALOG_DATA)
  formGroup: FormGroup
  estaCargando = false

  constructor(private formBuilder: FormBuilder, private servicio: GastoService) {
    console.log(this.presupuesto)
    this.formGroup = this.formBuilder.group({
      cantidad: [0, [Validators.required, Validators.min(1), Validators.max(5000)]]
    })
  }
}
