import { Component, EventEmitter, Input, Output, Version } from '@angular/core';
import { MaterialModule } from '../../../../modules/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GastoService } from '../../../../services/gasto.service';
import { generarGuid } from '../../../../helpers/guid';
import { SubcategoriaDto } from '../../../../interfaces/subcategoria-dto';
import { AhorroDto, TipoDeAhorro } from '../../../../interfaces/ahorro-dto';
import { PresupuestoDtoIn } from '../../../../interfaces/presupuesto-dto';
import { MatSelectChange } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-de-presupuesto',
  imports: [MaterialModule, ReactiveFormsModule, MatCardModule, CommonModule],
  templateUrl: './formulario-de-presupuesto.component.html',
  styleUrl: './formulario-de-presupuesto.component.css'
})
export class FormularioDePresupuestoComponent {
  mostrarSubcategoria(matSelect: MatSelectChange<any>) {
    this.subcategoriaSeleccionada = this.subcategorias.find(x => x.id == matSelect.value)
  }
  mostrarAhorro(data: MatSelectChange<any>) {
    this.ahorroSeleccionado = this.ahorros.find(x => x.id == data.value)
    //console.log(this.ahorroSeleccionado)
  }


  guardar() {
    if (this.formGroup.valid) {
      let presupuesto: PresupuestoDtoIn = {
        ahorroId: this.formGroup.value.ahorroId == '' || this.formGroup.value.ahorroId == 0 ? null : this.formGroup.value.ahorroId,
        cantidad: this.formGroup.value.cantidad,
        guid: this.formGroup.value.guid,
        subcategoriaId: this.formGroup.value.subcategoriaId,
        versionId: this.formGroup.value.versionId,
      }
      this.presupuestoEvenEmitter.emit(presupuesto)
    }
  }

  formGroup: FormGroup
  subcategorias: SubcategoriaDto[] = []
  subcategoriaSeleccionada?: SubcategoriaDto
  tiposDeAhorro: TipoDeAhorro[] = []
  ahorros: AhorroDto[] = []
  ahorroSeleccionado: AhorroDto | undefined;
  @Input() estaCargando = false
  @Input() presupuestoDtoIn?: PresupuestoDtoIn
  @Output() presupuestoEvenEmitter = new EventEmitter<PresupuestoDtoIn>()

  constructor(private formBuilder: FormBuilder, private servicio: GastoService) {
    this.obtenerSubcategorias()
    this.obtenerAhorros()
    this.formGroup = this.formBuilder.group({
      subcategoriaId: ['', Validators.required],
      cantidad: ['', Validators.required],
      guid: generarGuid(),
      ahorroId: ['0'],
      versionId: ''
    })
  }

  ngOnChanges() {
    if (this.presupuestoDtoIn != undefined) {
      this.formGroup.patchValue({
        subcategoriaId: this.presupuestoDtoIn.subcategoriaId.toString(),
        cantidad: this.presupuestoDtoIn.cantidad,
        guid: this.presupuestoDtoIn.guid,
        ahorroId: this.presupuestoDtoIn.ahorroId?.toString(),
        versionId: this.presupuestoDtoIn.versionId
      })
      this.subcategoriaSeleccionada = this.subcategorias.find(x => x.id == this.presupuestoDtoIn?.subcategoriaId)
      this.ahorroSeleccionado = this.ahorros.find(x => x.id == this.presupuestoDtoIn?.ahorroId)
    }

    if (this.estaCargando) {
      this.formGroup.get('subcategoriaId')?.disable()
      this.formGroup.get('cantidad')?.disable()
      this.formGroup.get('ahorroId')?.disable()
    } else {
      this.formGroup.get('subcategoriaId')?.enable()
      this.formGroup.get('cantidad')?.enable()
      this.formGroup.get('ahorroId')?.enable()
    }
  }

  obtenerAhorros() {
    this.servicio.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        this.ahorros = ahorros
      }
    })
  }

  obtenerSubcategorias() {
    this.servicio.subcategoria.obtenerTodos().subscribe({
      next: (subcategorias) => {
        this.subcategorias = subcategorias
      }
    })
  }

}
