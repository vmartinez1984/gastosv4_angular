import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoDeAhorroDto } from '../../../interfaces/tipo-de-ahorro-dto';
import { GastoService } from '../../../services/gasto.service';
import { generarGuid } from '../../../helpers/guid';
import { AhorroDtoIn } from '../../../interfaces/ahorro-dto';

@Component({
  selector: 'app-formulario-de-ahorro',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './formulario-de-ahorro.component.html',
  styleUrl: './formulario-de-ahorro.component.css'
})
export class FormularioDeAhorroComponent {
  formGroup: FormGroup
  tiposDeAhorros: TipoDeAhorroDto[] = []
  @Input() estaCargando = false
  @Input() ahorroDtoIn?: AhorroDtoIn
  @Output() ahorroEventEmitter: EventEmitter<AhorroDtoIn> = new EventEmitter<AhorroDtoIn>()

  constructor(
    private servicio: GastoService,
    private formBuild: FormBuilder,
  ) {
    this.obtenerTiposDeAhorros()
    this.formGroup = this.formBuild.group({
      guid: generarGuid(),
      nombre: ['', Validators.required],
      //interes: [''],
      fechaInicial: [''],
      fechaFinal: [''],
      tipoDeAhorroId: ['', Validators.required],
    })
  }

  ngOnChanges() {
    //console.log("formulario", this.ahorroDtoIn)
    if(this.ahorroDtoIn != undefined){
      this.formGroup.patchValue({
        guid: this.ahorroDtoIn.guid,
        nombre: this.ahorroDtoIn.nombre,
        fechaFinal : this.ahorroDtoIn.fechaFinal,
        fechaInicial: this.ahorroDtoIn.fechaInicial,
        tipoDeAhorroId: this.ahorroDtoIn.tipoDeAhorroId.toString()
      })
    }
  }

  obtenerTiposDeAhorros() {
    this.servicio.tipoDeAhorro.obtenerTodos().subscribe({
      next: (categorias) => {
        //console.log(categorias)
        this.tiposDeAhorros = categorias
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  guardar() {
    //console.log(this.formGroup.value)
    if (this.formGroup.valid) {
      let ahorro: AhorroDtoIn = {
        fechaFinal: this.formGroup.value.fechaFinal == '' ? null : this.formGroup.value.fechaFinal,
        fechaInicial: this.formGroup.value.fechaInicial == '' ? null : this.formGroup.value.fechaInicial,
        guid: this.formGroup.value.guid,
        nombre: this.formGroup.value.nombre,
        tipoDeAhorroId: this.formGroup.value.tipoDeAhorroId
      }

      this.ahorroEventEmitter.emit(ahorro)
    }
  }
}
