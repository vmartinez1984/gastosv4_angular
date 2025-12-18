import { Component, inject} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VersionDto, VersionDtoIn } from '../../../interfaces/version-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import { GastoService } from '../../../services/gasto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { M } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-formulario-de-version',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './formulario-de-version.component.html',
  styleUrl: './formulario-de-version.component.css',
})
export class FormularioDeVersionComponent {
  formGroup: FormGroup;
  estaCargando = false;
  versionDtoIn?: VersionDtoIn;
  readonly dialogRef = inject(MatDialogRef<FormularioDeVersionComponent>);
  readonly version = inject<VersionDto>(MAT_DIALOG_DATA);

  constructor(private formBuild: FormBuilder, private servicio: GastoService) {
    this.formGroup = this.formBuild.group({
      nombre: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
    });
    if(this.version != null){
      console.log(this.version);
      this.formGroup.get('nombre')?.setValue(this.version.nombre);
      this.formGroup.get('fechaInicial')?.setValue(this.version.fechaInicial.toString().substring(0,10) + 'T00:00:00');
      this.formGroup.get('fechaFinal')?.setValue(this.version.fechaFinal.toString().substring(0,10) + 'T00:00:00');
    }
  }

  ngOnChanges() {
    //console.log("formulario", this.ahorroDtoIn)
    if (this.versionDtoIn != undefined) {
      this.formGroup.patchValue({
        nombre: this.versionDtoIn.nombre,
        fechaFinal:
          this.versionDtoIn.fechaFinal.toString() == ''
            ? null
            : this.versionDtoIn.fechaFinal,
        fechaInicial:
          this.versionDtoIn.fechaInicial.toString() == ''
            ? null
            : this.versionDtoIn.fechaInicial,
      });
    }

    if (this.estaCargando) {
      this.formGroup.get('nombre')?.disable();
      this.formGroup.get('fechaFinal')?.disable();
      this.formGroup.get('fechaInicial')?.disable();
    } else {
      this.formGroup.get('nombre')?.enable();
      this.formGroup.get('fechaFinal')?.enable();
      this.formGroup.get('fechaInicial')?.enable();
    }
  }

  guardar() {
    //console.log(this.formGroup.value)
    if (this.formGroup.valid) {
      this.estaCargando = true;
      this.formGroup.disable();
      let version: VersionDtoIn = {
        fechaFinal:
          this.formGroup.value.fechaFinal == ''
            ? null
            : this.formGroup.value.fechaFinal,
        fechaInicial:
          this.formGroup.value.fechaInicial == ''
            ? null
            : this.formGroup.value.fechaInicial,
        nombre: this.formGroup.value.nombre,
      };
      console.log(version);
      if (this.version == null){
        this.servicio.version.agregar(version).subscribe({
          next: (data) => {
            this.dialogRef.close(data)
          },
        });
      }else{
        this.servicio.version.actualizar(this.version.id, version).subscribe({
          next: (data) => {
            this.dialogRef.close({id: this.version?.id})
          },
        });
      }
    }
  }
}
