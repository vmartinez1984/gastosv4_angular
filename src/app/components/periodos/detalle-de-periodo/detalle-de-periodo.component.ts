import { Component, inject } from '@angular/core'
import { GastoService } from '../../../services/gasto.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table'
import { MaterialModule } from '../../../modules/material/material.module'
import { CommonModule } from '@angular/common'
import { PresupuestoDelPeriodoDto } from '../../../interfaces/presupuesto-del-periodo-dto'
import Swal from 'sweetalert2'
import { TransaccionDtoIn } from '../../../interfaces/transaccion-dto'
import { generarGuid } from '../../../helpers/guid'
import { firstValueFrom } from 'rxjs'
import { ok } from '../../../helpers/toast'
import { HttpErrorResponse } from '@angular/common/http'
import { AhorroDto } from '../../../interfaces/ahorro-dto'
import { MatCardModule } from '@angular/material/card'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import { FormularioDeMovimientoComponent } from '../formulario-de-movimiento/formulario-de-movimiento.component'

@Component({
  selector: 'app-detalle-de-periodo',
  imports: [MaterialModule, CommonModule, MatCardModule],
  templateUrl: './detalle-de-periodo.component.html',
  styleUrl: './detalle-de-periodo.component.css'
})
export class DetalleDePeriodoComponent {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();        
  }
  
  async agregarTransaccion(periodoId: number, transaccion: TransaccionDtoIn) {
    //console.log(periodoId,transaccion)
    try {
      const response = await firstValueFrom(this.servicio.periodo.agregarTransaccion(periodoId, transaccion))
      return response
    } catch (error) {
      console.error('Error al agregar transacción', error);
      throw error;
    }
  }

  async mostrarFormulario(presupuesto: PresupuestoDelPeriodoDto) {
    /*
    Swal.fire({
      title: "Agregar cantidad de la transacción",
      text: "Presupuesto: " + presupuesto.cantidad + ", Gastado: " + presupuesto.gastado + ", Disponible: " + (presupuesto.cantidad - presupuesto.gastado),
      input: "number",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Agregar",
      showLoaderOnConfirm: true,
      preConfirm: async (cantidad) => {
        try {
          let transaccion: TransaccionDtoIn = {
            cantidad: cantidad,
            encodedKey: generarGuid(),
            presupuestoId: presupuesto.presupuestoId
          }
          const response = await this.agregarTransaccion(presupuesto.periodoId, transaccion)
          //console.log(response)
          //añadir a la presupuesto la transaccion          
          // if (this.ahorro?.balance)
          //   this.ahorro.balance = Number(this.ahorro.balance) - Number(presupuesto.cantidad)
          this.servicio.ahorro.obtenerAhorroEje().subscribe({
            next: (ahorroEje) => {
              this.ahorro = ahorroEje
            }
          })
          let presupuestoAActualizar = this.presupuestos.find(x => x.presupuestoId == presupuesto?.presupuestoId)
          if (presupuestoAActualizar)
            presupuestoAActualizar.gastado = Number(transaccion.cantidad) + Number(presupuestoAActualizar.gastado)
          this.dataSource = new MatTableDataSource(this.presupuestos)
          return response
        } catch (error) {
          //console.log(error as HttpErrorResponse)
          let data = error as HttpErrorResponse
          //console.log(data.error['mensaje'])
          Swal.showValidationMessage(`
            Valio pepino: ${data.error.mensaje}
          `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        ok()
      }
    });
    */
    const dialogRef = this.dialog.open(FormularioDeMovimientoComponent,{
      data: presupuesto  
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
        this.ahorro = ahorroEje
      }
    })
  }

  estaCargando = false
  total: number = 0
  presupuestos: PresupuestoDelPeriodoDto[] = []
  dataSource = new MatTableDataSource(this.presupuestos)
  columnas = ['cantidad', 'subcategoria', 'tipoDeAhorro', 'gastado', 'id']
  readonly dialog = inject(MatDialog);
  id: number = 0
  ahorro?: AhorroDto
}
