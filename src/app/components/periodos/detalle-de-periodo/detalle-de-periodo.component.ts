import { Component } from '@angular/core'
import { GastoService } from '../../../services/gasto.service'
import { ActivatedRoute } from '@angular/router'
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

@Component({
  selector: 'app-detalle-de-periodo',
  imports: [MaterialModule, CommonModule, MatCardModule],
  templateUrl: './detalle-de-periodo.component.html',
  styleUrl: './detalle-de-periodo.component.css'
})
export class DetalleDePeriodoComponent {
  async agregarTransaccion(periodoId: number, transaccion: TransaccionDtoIn) {
    try {
      const response = await firstValueFrom(this.servicio.periodo.agregarTransaccion(periodoId, transaccion))
      return response
    } catch (error) {
      console.error('Error al agregar transacción', error);
      throw error;
    }
  }
  async mostrarFormulario(presupuesto: PresupuestoDelPeriodoDto) {
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
          console.log(response)
          //añadir a la presupuesto la transaccion
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
  }

  obtenerVersion(id: number) {
    this.servicio.periodo.obtenerPresupuestos(id).subscribe({
      next: (presupuestos) => {
        //console.log(presupuestos)
        this.presupuestos = presupuestos
        this.dataSource = new MatTableDataSource(this.presupuestos)
      }
    })
  }

  constructor(private servicio: GastoService, private activatedRoute: ActivatedRoute) {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.servicio.periodo.obtenerPorId(id).subscribe({
      next: (data) => {
        //console.log(data)
        this.obtenerVersion(data.versionId)
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
  columnas = ['cantidad', 'subcategoria', 'gastado', 'id']
  id: number = 0
  ahorro?: AhorroDto
}
