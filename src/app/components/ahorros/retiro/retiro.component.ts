import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { generarGuid } from '../../../helpers/guid';
import { MovimientoDtoIn } from '../../../interfaces/movimiento-dto';
import { GastoService } from '../../../services/gasto.service';
import { MaterialModule } from '../../../modules/material/material.module';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-retiro',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './retiro.component.html',
  styleUrl: './retiro.component.css',
})
export class RetiroComponent {
  previsualizarTotal() {
    this.subtotal = this.ahorroDto?.balance + this.formGroup.value.cantidad;
  }

  guardar() {
    let deposito: MovimientoDtoIn = {
      monto: this.formGroup.value.cantidad,
      concepto: this.formGroup.value.concepto,
      referencia: this.formGroup.value.referencia,
    };
    this.estaCargando = true;
    this.habilitarFormulario(false);
    this.servicio.ahorro.retirar(this.ahorroId, deposito).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['ahorros', 'detalles', this.ahorroId]);
      },
      error: (data) => {
        this.estaCargando = false;
        this.habilitarFormulario(true);
        console.log(data);
      },
    });
  }

  habilitarFormulario(habilitar: boolean) {
    if (habilitar) {
      this.formGroup.get('cantidad')?.enable();
      this.formGroup.get('concepto')?.enable();
    } else {
      this.formGroup.get('cantidad')?.disable();
      this.formGroup.get('concepto')?.disable();
    }
  }

  formGroup: FormGroup;
  estaCargando = false;
  ahorroId: number = 0;
  ahorroDto?: AhorroDto;
  subtotal = 0

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private servicio: GastoService,
    private router: Router
  ) {
    this.ahorroId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.formGroup = this.formBuilder.group({
      referencia: generarGuid(),
      cantidad: ['', Validators.required],
      concepto: ['', Validators.required],
    });
    this.servicio.ahorro.obtenerPorId(this.ahorroId).subscribe({
      next: (ahorro) => {
        this.ahorroDto = ahorro
        this.subtotal = ahorro.balance
      },
    });
  }
}
