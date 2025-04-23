import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { generarGuid } from '../../../helpers/guid';
import { MovimientoDtoIn } from '../../../interfaces/movimiento-dto';
import { GastoService } from '../../../services/gasto.service';
import { MaterialModule } from '../../../modules/material/material.module';

@Component({
  selector: 'app-retiro',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './retiro.component.html',
  styleUrl: './retiro.component.css'
})
export class RetiroComponent {
  guardar() {
    let deposito: MovimientoDtoIn = {
      cantidad: this.formGroup.value.cantidad,
      concepto: this.formGroup.value.concepto,
      referencia: this.formGroup.value.referencia
    }
    this.estaCargando = true
    this.habilitarFormulario(false)
    this.servicio.ahorro.retirar(this.ahorroId, deposito).subscribe({
      next: (data) => {
        console.log(data)
        this.router.navigate(['ahorros', 'detalles', this.ahorroId])
      }, error: (data) => {
        this.estaCargando = false
        this.habilitarFormulario(true)
        console.log(data)
      }
    })
  }

  habilitarFormulario(habilitar: boolean) {
    if(habilitar){
      this.formGroup.get('cantidad')?.enable()
      this.formGroup.get('concepto')?.enable()
    }else{
      this.formGroup.get('cantidad')?.disable()
      this.formGroup.get('concepto')?.disable()
    }
  }

  formGroup: FormGroup
  estaCargando = false
  ahorroId: number = 0

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    this.ahorroId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.formGroup = this.formBuilder.group({
      referencia: generarGuid(),
      cantidad: ['', Validators.required],
      concepto: ['', Validators.required]
    })
  }
}
