import { Component } from '@angular/core'
import { MaterialModule } from '../../../modules/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { generarGuid } from '../../../helpers/guid';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimientoDtoIn } from '../../../interfaces/movimiento-dto';
import { GastoService } from '../../../services/gasto.service';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deposito',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './deposito.component.html',
  styleUrl: './deposito.component.css'
})
export class DepositoComponent {
  previsualizarTotal() {    
    this.subtotal= this.ahorroDto?.balance + this.formGroup.value.cantidad
  }

  guardar() {
    let deposito: MovimientoDtoIn = {
      cantidad: this.formGroup.value.cantidad,
      concepto: this.formGroup.value.concepto,
      referencia: this.formGroup.value.referencia
    }
    this.estaCargando = true
    this.habilitarFormulario(false)
    this.servicio.ahorro.depositar(this.ahorroId, deposito).subscribe({
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
    if (habilitar) {
      this.formGroup.get('cantidad')?.enable()
      this.formGroup.get('concepto')?.enable()
    } else {
      this.formGroup.get('cantidad')?.disable()
      this.formGroup.get('concepto')?.disable()
    }
  }

  formGroup: FormGroup
  estaCargando = false
  ahorroId: number = 0
  ahorroDto?: AhorroDto 
  subtotal= 0 

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    this.ahorroId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.formGroup = this.formBuilder.group({
      referencia: generarGuid(),
      cantidad: ['', Validators.required],
      concepto: ['', Validators.required]
    })
    this.servicio.ahorro.obtenerPorId(this.ahorroId).subscribe({
      next: (ahorro) => {
        this.ahorroDto = ahorro    
        this.subtotal = ahorro.balance    
      }
    })
  }
}
