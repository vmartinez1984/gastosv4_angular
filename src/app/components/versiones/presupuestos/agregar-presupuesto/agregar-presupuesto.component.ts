import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioDePresupuestoComponent } from '../formulario-de-presupuesto/formulario-de-presupuesto.component';
import { PresupuestoDtoIn } from '../../../../interfaces/presupuesto-dto';
import { GastoService } from '../../../../services/gasto.service';
import { error, ok } from '../../../../helpers/toast';

@Component({
  selector: 'app-agregar-presupuesto',
  imports: [FormularioDePresupuestoComponent],
  templateUrl: './agregar-presupuesto.component.html',
  styleUrl: './agregar-presupuesto.component.css'
})
export class AgregarPresupuestoComponent {
  
  guardar(presupuesto: PresupuestoDtoIn) {
    this.estaCargando = true
    presupuesto.versionId = this.versionId
    console.log(presupuesto)
    this.servicio.presupuesto.agregarPresupuesto(presupuesto).subscribe({
      next: (data) => {
        ok()
        this.router.navigate(['versiones', this.versionId, 'detalles'])
      },
      error:(data)=>{
        console.log(data)
        error()
        this.estaCargando = false
      }      
    })
  }
  
  estaCargando: boolean = false
  versionId: number;

  constructor(private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    this.versionId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }
}
