import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { generarGuid } from '../../../../helpers/guid';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IdDto } from '../../../../interfaces/id-dto';
import { MaterialModule } from '../../../../modules/material/material.module';

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
      // Lógica para pagar la compra
      this.estaCargando = false;
      this.dialogRef.close();
    }
  }
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      monto: ['', [Validators.required]],
      nota: [''],
    });
  }

  formGroup: FormGroup;
  estaCargando = false;
  encodedkey = generarGuid();
  readonly dialogRef = inject(MatDialogRef<PagarCompraComponent>);
  readonly data = inject<IdDto>(MAT_DIALOG_DATA);
}
