import { Component, inject, signal } from '@angular/core'
import { GastoService } from '../../../services/gasto.service'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { MaterialModule } from '../../../modules/material/material.module'
import { CommonModule } from '@angular/common'
import { PresupuestoDelPeriodoDto } from '../../../interfaces/presupuesto-del-periodo-dto'
import { AhorroDto } from '../../../interfaces/ahorro-dto'
import { MatCardModule } from '@angular/material/card'
import { MatDialog } from '@angular/material/dialog'
import { FormularioDeMovimientoComponent } from '../formulario-de-movimiento/formulario-de-movimiento.component'

@Component({
  selector: 'app-detalle-de-periodo',
  imports: [MaterialModule, CommonModule, MatCardModule, RouterModule],
  templateUrl: './detalle-de-periodo.component.html',
  styleUrl: './detalle-de-periodo.component.css'
})
export class DetalleDePeriodoComponent {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async mostrarFormulario(presupuesto: PresupuestoDelPeriodoDto) {
    console.log(presupuesto)
    const dialogRef = this.dialog.open(FormularioDeMovimientoComponent, {
      data: { presupuesto, cantidad: this.cantida() }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(dialogRef.componentInstance.data)
      if (this.ahorro?.balance)
        this.ahorro.balance = Number(this.ahorro.balance) - Number(dialogRef.componentInstance.data.cantidad)
      let presupuestoAActualizar = this.presupuestos.find(x => x.presupuestoId == presupuesto?.presupuestoId)
      if (presupuestoAActualizar)
        presupuestoAActualizar.gastado = Number(dialogRef.componentInstance.data.cantidad) + Number(presupuestoAActualizar.gastado)
      this.dataSource = new MatTableDataSource(this.presupuestos)
    })
  }

  obtenerPresupuestos(id: number) {
    this.estaCargando = true
    this.servicio.periodo.obtenerPresupuestos(id).subscribe({
      next: (presupuestos) => {
        //console.log(presupuestos)
        this.presupuestos = presupuestos
        this.dataSource = new MatTableDataSource(this.presupuestos)
        this.estaCargando = false
        this.gastado = 0
        this.presupuestos.forEach(item =>{
          this.gastado = this.gastado + item.gastado
        })
      }
    })
  }

  constructor(private servicio: GastoService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.estaCargando = true
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.servicio.periodo.obtenerPorId(id).subscribe({
      next: (periodo) => {
        //console.log(data)  
        this.estaCargando = true
        this.obtenerPresupuestos(periodo.id)
      },
      error: (data) => {
        //console.log(data)
        if (data.status == 401) {
          router.navigate(['/', 'inicioDeSesion'])
        }
      }
    })
    this.servicio.ahorro.obtenerAhorroEje().subscribe({
      next: (ahorroEje) => {
        //console.log(ahorroEje)
        this.ahorro = ahorroEje
      }
    })
  }

  estaCargando = false
  total: number = 0
  gastado: number = 0
  presupuestos: PresupuestoDelPeriodoDto[] = []
  dataSource = new MatTableDataSource(this.presupuestos)
  columnas = ['cantidad', 'subcategoria', 'tipoDeAhorro', 'gastado', 'id']
  readonly dialog = inject(MatDialog);
  id: number = 0
  ahorro?: AhorroDto
  readonly cantida = signal('')
}

export interface DialogData {
  presupuesto: PresupuestoDelPeriodoDto,
  cantidad: number
}