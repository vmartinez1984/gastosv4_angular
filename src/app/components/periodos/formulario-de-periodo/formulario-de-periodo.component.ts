import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { GastoService } from '../../../services/gasto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VersionDto } from '../../../interfaces/version-dto';
import { PeriodoDtoIn } from '../../../interfaces/periodo-dto';
import { generarGuid } from '../../../helpers/guid';

@Component({
  selector: 'app-formulario-de-periodo',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './formulario-de-periodo.component.html',
  styleUrl: './formulario-de-periodo.component.css'
})
export class FormularioDePeriodoComponent {
  guardar() {
    if (this.formGroup.valid) {
      let periodo: PeriodoDtoIn = {
        fechaFinal: this.formGroup.value.fechaFinal == '' ? null : this.formGroup.value.fechaFinal,
        fechaInicial: this.formGroup.value.fechaInicial == '' ? null : this.formGroup.value.fechaInicial,
        guid: this.formGroup.value.guid,
        nombre: this.formGroup.value.nombre,
        versionId: this.formGroup.value.versionId
      }
      this.periodoEventEmitter.emit(periodo)
    }
  }
  constructor(
    private servicio: GastoService,
    private formBuild: FormBuilder,
  ) {
    this.formGroup = this.formBuild.group({
      guid: generarGuid(),
      nombre: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      versionId: ['', Validators.required],
    })
    this.estaCargando = true
    this.servicio.version.obtenerTodos().subscribe({
      next:(data)=>{
        this.versiones = data
        this.estaCargando = false
      }
    })
  }

  ngOnChanges() {
    //console.log("formulario", this.ahorroDtoIn)
    if (this.periodoDtoIn != undefined) {
      this.formGroup.patchValue({
        guid: this.periodoDtoIn.guid,
        nombre: this.periodoDtoIn.nombre,
        fechaFinal: this.periodoDtoIn.fechaFinal,
        fechaInicial: this.periodoDtoIn.fechaInicial,
        versionId: this.periodoDtoIn.versionId.toString()
      })
    }

    if(this.estaCargando){
      this.formGroup.get('nombre')?.disable()
      this.formGroup.get('fechaFinal')?.disable()
      this.formGroup.get('fechaInicial')?.disable()
      this.formGroup.get('versionId')?.disable()
    }else{
      this.formGroup.get('nombre')?.enable()
      this.formGroup.get('fechaFinal')?.enable()
      this.formGroup.get('fechaInicial')?.enable()
      this.formGroup.get('versionId')?.enable()
    }
  }

  formGroup: FormGroup
  versiones: VersionDto[] = []
  @Input() estaCargando = false
  @Input() periodoDtoIn?: PeriodoDtoIn
  @Output() periodoEventEmitter: EventEmitter<PeriodoDtoIn> = new EventEmitter<PeriodoDtoIn>()
}
