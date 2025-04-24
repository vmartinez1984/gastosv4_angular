import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VersionDtoIn } from '../../../interfaces/version-dto';
import { generarGuid } from '../../../helpers/guid';
import { MaterialModule } from '../../../modules/material/material.module';

@Component({
  selector: 'app-formulario-de-version',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './formulario-de-version.component.html',
  styleUrl: './formulario-de-version.component.css'
})
export class FormularioDeVersionComponent {
  formGroup: FormGroup
  @Input() estaCargando = false
  @Input() versionDtoIn?: VersionDtoIn
  @Output() versionEventEmitter: EventEmitter<VersionDtoIn> = new EventEmitter<VersionDtoIn>()

  constructor(
    private formBuild: FormBuilder,
  ) {
    this.formGroup = this.formBuild.group({
      nombre: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required]
    })
  }

  ngOnChanges() {
    //console.log("formulario", this.ahorroDtoIn)
    if (this.versionDtoIn != undefined) {
      this.formGroup.patchValue({
        nombre: this.versionDtoIn.nombre,
        fechaFinal: this.versionDtoIn.fechaFinal.toString() == '' ? null : this.versionDtoIn.fechaFinal,
        fechaInicial: this.versionDtoIn.fechaInicial.toString() == '' ? null : this.versionDtoIn.fechaInicial
      })
    }

    if(this.estaCargando){
      this.formGroup.get('nombre')?.disable()
      this.formGroup.get('fechaFinal')?.disable()
      this.formGroup.get('fechaInicial')?.disable()
    }else{
      this.formGroup.get('nombre')?.enable()
      this.formGroup.get('fechaFinal')?.enable()
      this.formGroup.get('fechaInicial')?.enable()
    }

  }

  guardar() {
    //console.log(this.formGroup.value)
    if (this.formGroup.valid) {
      let version: VersionDtoIn = {
        fechaFinal: this.formGroup.value.fechaFinal == '' ? null : this.formGroup.value.fechaFinal,
        fechaInicial: this.formGroup.value.fechaInicial == '' ? null : this.formGroup.value.fechaInicial,
        nombre: this.formGroup.value.nombre
      }

      this.versionEventEmitter.emit(version)
    }
  }
}
