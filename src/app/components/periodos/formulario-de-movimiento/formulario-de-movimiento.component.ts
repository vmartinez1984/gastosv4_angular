import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
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
    ReactiveFormsModule
  ],
  templateUrl: './formulario-de-movimiento.component.html',
  styleUrl: './formulario-de-movimiento.component.css'
})
export class FormularioDeMovimientoComponent {
  guardar() {
    if (this.formGroup.valid) {
      //console.log(this.formGroup.value)
      this.estaCargando = true
      let transaccion: TransaccionDtoIn = {
        cantidad: this.formGroup.value.cantidad,
        encodedKey: generarGuid(),
        presupuestoId: this.data.presupuesto.presupuestoId
      }

      this.estaCargando = true
      this.servicio.periodo.agregarTransaccion(this.presupuesto.periodoId, transaccion).subscribe({
        next:(data)=>{
          console.log(data)
          this._snackBar.open("Datos registrados ", "", {
            duration: 3000
          })
          this.estaCargando = false          
        
          this.data.cantidad = Number(this.formGroup.value.cantidad)
          this.dialogRef.close()
        },
        error:(data)=>{
          console.log(data.status)
          this.estaCargando = false
          this._snackBar.open("Valio pepino ", "", {
            duration: 3000
          })
        }
      })
    }
  }
  readonly dialogRef = inject(MatDialogRef<FormularioDeMovimientoComponent>)
  readonly data = inject<DialogData>(MAT_DIALOG_DATA)
  private _snackBar = inject(MatSnackBar)
  formGroup: FormGroup
  estaCargando = false 
  readonly presupuesto = this.data.presupuesto  
  
  constructor(private formBuilder: FormBuilder, private servicio: GastoService) {
    console.log(this.data)
    this.formGroup = this.formBuilder.group({
      cantidad: [0, [Validators.required, Validators.min(1), Validators.max(5000)]]
    })
  }
}
