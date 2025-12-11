import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TipoDeAhorroDto } from '../../../interfaces/tipo-de-ahorro-dto';
import { GastoService } from '../../../services/gasto.service';
import { generarGuid } from '../../../helpers/guid';
import { AhorroDto, AhorroDtoIn } from '../../../interfaces/ahorro-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-formulario-de-ahorro',
  imports: [MaterialModule, ReactiveFormsModule],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-MX' }],
  templateUrl: './formulario-de-ahorro.component.html',
  styleUrl: './formulario-de-ahorro.component.css',
})
export class FormularioDeAhorroComponent {
  formGroup!: FormGroup;
  tiposDeAhorros: TipoDeAhorroDto[] = [];
  estaCargando = false;
  readonly dialogRef = inject(MatDialogRef<FormularioDeAhorroComponent>);
  readonly ahorro = inject<AhorroDto>(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);

  constructor(private servicio: GastoService, private formBuild: FormBuilder) {
    this.formGroup = this.formBuild.group({
      guid: generarGuid(),
      nombre: ['', Validators.required],
      fechaInicial: [''],
      fechaFinal: [''],
      tipoDeAhorroId: ['', Validators.required],
    });
    this.obtenerTiposDeAhorros();
    console.log(this.ahorro);
  }

  iniciarFormulario() {
    if (this.ahorro != null) {
      this.formGroup.get('guid')?.setValue(this.ahorro.guid);
      this.formGroup.get('nombre')?.setValue(this.ahorro.nombre);
      this.formGroup
        .get('fechaInicial')
        ?.setValue(this.ahorro.fechaInicial + 'T00:00:00');
      this.formGroup
        .get('fechaFinal')
        ?.setValue(this.ahorro.fechaFinal + 'T00:00:00');
      this.formGroup
        .get('tipoDeAhorroId')
        ?.setValue(this.ahorro.tipoDeAhorroId.toString());
    }
  }

  obtenerTiposDeAhorros() {
    this.servicio.tipoDeAhorro.obtenerTodos().subscribe({
      next: (tiposDeAhorro) => {
        this.tiposDeAhorros = tiposDeAhorro;
        this.iniciarFormulario();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  guardar() {
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      this.formGroup.disable();
      this.estaCargando = true;
      let ahorro: AhorroDtoIn = {
        fechaFinal:
          this.formGroup.value.fechaFinal == ''
            ? null
            : this.formGroup.value.fechaFinal,
        fechaInicial:
          this.formGroup.value.fechaInicial == ''
            ? null
            : this.formGroup.value.fechaInicial,
        guid: this.formGroup.value.guid,
        nombre: this.formGroup.value.nombre,
        tipoDeAhorroId: this.formGroup.value.tipoDeAhorroId,
      };
      if (this.ahorro == null)
        this.servicio.ahorro.agregar(ahorro).subscribe({
          next: (data) => {
            console.log(data);
            this._snackBar.open('Ahorro guardado', '', {
              duration: 3000,
            });
            this.dialogRef.close(data);
          },
          error: (data) => {
            console.log(data);
            this._snackBar.open('Error al guardar el ahorro', '', {
              duration: 3000,
            });
            this.formGroup?.disable();
            this.estaCargando = true;
          },
        });
      else
        this.servicio.ahorro.actualizar(this.ahorro.id, ahorro).subscribe({
          next: (data) => {
            console.log(data);
            this._snackBar.open('Ahorro actualizado', '', {
              duration: 3000,
            });
            this.dialogRef.close(data);
          },
        });
    }
  }
}
