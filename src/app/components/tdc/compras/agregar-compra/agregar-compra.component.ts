import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CompraTdcService } from '../../services/compra-tdc.service';
import { CompraDtoIn } from '../../interfaces/compra-dto';
import { generarGuid } from '../../../../helpers/guid';
import { MaterialModule } from '../../../../modules/material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { DialogData } from '../../../periodos/detalle-de-periodo/detalle-de-periodo.component';
import { IdDto } from '../../../../interfaces/id-dto';

@Component({
  selector: 'app-agregar-compra',
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
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './agregar-compra.component.html',
  styleUrl: './agregar-compra.component.css',
})
export class AgregarCompraComponent {
  guardar() {
    //console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.estaCargando = true;
      let compra: CompraDtoIn = {
        nombre: this.formGroup.value.nombre!,
        monto: this.formGroup.value.monto!,
        nota: this.formGroup.value.nota!,
        mesesSinIntereses: this.formGroup.value.mesesSinIntereses!,
        fechaDeCompra: this.formGroup.value.fechaDeCompra!,
        encodedkey: this.encodedkey,
      };
      let fecha = this.formGroup.value.fechaDeCompra as Date;
      compra.fechaDeCompra = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
      console.log('Compra a guardar:', compra);
      this.service.agregarCompraTdc(compra).subscribe({
        next: (respuesta) => {
          console.log('Compra agregada', respuesta);
          // this.estaCargando = false;
          // this.data.id = respuesta.id;
          // this.data.guid = respuesta.guid;
          // this.data.fechaDeRegistro = respuesta.fechaDeRegistro;
          this.dialogRef.close();
        },
      });
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: CompraTdcService
  ) {
    this.formGroup = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      monto: ['', [Validators.required]],
      nota: [''],
      mesesSinIntereses: [0],
      fechaDeCompra: [new Date(), [Validators.required]],
    });
  }

  formGroup: FormGroup;
  estaCargando = false;
  encodedkey = generarGuid();
  readonly dialogRef = inject(MatDialogRef<AgregarCompraComponent>);
  readonly data = inject<IdDto>(MAT_DIALOG_DATA);
}
