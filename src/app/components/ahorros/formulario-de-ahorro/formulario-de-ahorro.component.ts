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
  tiposDeAhorros : TipoDeAhorroDto[] = []
  @Input() estaCargando = false
  @Output() ahorroEventEmitter: EventEmitter<AhorroDtoIn> = new EventEmitter<AhorroDtoIn>()

  constructor(
    private servicio: GastoService, 
    private formBuild: FormBuilder,
  ){
    this.obtenerTiposDeAhorros()
    this.formGroup = this.formBuild.group({
      guid: generarGuid(),
      nombre: ['', Validators.required],
      interes: [''],
      fechaInicial: [''],
      fechaFinal: [''],
      tipoDeAhorroId: ['', Validators.required],
    })
  }

  obtenerTiposDeAhorros() {
    this.servicio.tipoDeAhorro.obtenerTodos().subscribe({
      next:(categorias)=>{
        //console.log(categorias)
        this.tiposDeAhorros = categorias
      }, error: (error)=>{
        console.log(error)
      }
    })
  }

  guardar(){
    //console.log(this.formGroup.value)
    if(this.formGroup.valid){
      this.ahorroEventEmitter.emit(this.formGroup.value)
    }
  }
}
