import { Component } from '@angular/core';
import { FormularioDePresupuestoComponent } from "../formulario-de-presupuesto/formulario-de-presupuesto.component";
import { PresupuestoDto, PresupuestoDtoIn } from '../../../../interfaces/presupuesto-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../../../services/gasto.service';
import { error, ok } from '../../../../helpers/toast';

@Component({
  selector: 'app-editar-presupuesto',
  imports: [FormularioDePresupuestoComponent],
  templateUrl: './editar-presupuesto.component.html',
  styleUrl: './editar-presupuesto.component.css'
})
export class EditarPresupuestoComponent {
  estaCargando = false
  versionId: number
  presupuestoId: number
  presupuestoDto?: PresupuestoDto
  presupuestoDtoIn?: PresupuestoDtoIn

  guardar(presupuesto: PresupuestoDtoIn) {
    console.log(presupuesto)
    this.estaCargando = true
    this.servicio.presupuesto.actualizarPresupuesto(this.presupuestoId, presupuesto).subscribe({
      next: (data) => {
        ok()
        this.router.navigate(['versiones', this.versionId, 'detalles'])
      },
      error: (data) => {
        console.log(data)
        error()
        this.estaCargando = false
      }
    })
  }

  constructor(private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    this.versionId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.presupuestoId = Number(this.activatedRoute.snapshot.paramMap.get('presupuestoId'))
    this.estaCargando = true
    this.servicio.presupuesto.obtenerPresupuesto(this.presupuestoId).subscribe({
      next: (presupuesto) => {
        console.log(presupuesto)
        this.presupuestoDto = presupuesto
        this.presupuestoDtoIn = {
          ahorroId: presupuesto.ahorroId,
          cantidad: presupuesto.cantidad,
          guid: presupuesto.guid,
          subcategoriaId: presupuesto.subcategoriaId,
          versionId: presupuesto.versionId
        }
        this.estaCargando = false
      },
      error:(data)=>{
        console.log(data)
        error()
      }
    })
  }
}
