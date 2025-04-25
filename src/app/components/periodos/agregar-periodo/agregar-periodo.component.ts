import { Component } from '@angular/core';
import { FormularioDePeriodoComponent } from "../formulario-de-periodo/formulario-de-periodo.component";
import { PeriodoDtoIn } from '../../../interfaces/periodo-dto';
import { GastoService } from '../../../services/gasto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-periodo',
  imports: [FormularioDePeriodoComponent],
  templateUrl: './agregar-periodo.component.html',
  styleUrl: './agregar-periodo.component.css'
})
export class AgregarPeriodoComponent {

  guardar(periodo: PeriodoDtoIn) {
    console.log(periodo)
    this.estaCargando = true
    this.servicio.periodo.agregar(periodo).subscribe({
      next: (data) => {
        this.router.navigate(['periodos'])
      },
      error: (data) => {
        console.log(data)
        this.estaCargando = false
      }
    })
  }

  constructor(private servicio: GastoService, private router: Router) {

  }

  estaCargando = false
}
