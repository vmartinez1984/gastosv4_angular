import { Component } from '@angular/core';
import { VersionDto } from '../../../interfaces/version-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../../services/gasto.service';
import { PresupuestoDto } from '../../../interfaces/presupuesto-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { error, unMomento } from '../../../helpers/toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-de-version',
  imports: [MaterialModule, CommonModule],
  templateUrl: './detalles-de-version.component.html',
  styleUrl: './detalles-de-version.component.css'
})
export class DetallesDeVersionComponent {
borrar(presupuesto: any) {
    Swal.fire({
      title: "¿Desea borrar el presupuesto?",
      text: presupuesto.cantidad + ", "+ presupuesto.subcategoria.nombre,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        unMomento()
        this.servicio.version.borrarPresupuesto(this.versionDto?.id, presupuesto.id).subscribe({
          next: (data) => {
            let index = this.presupuestos.findIndex(x => x.id == presupuesto.id)
            console.log(index)
            this.presupuestos.splice(index, 1)
            //console.log(this.presupuestos)
            this.dataSource = new MatTableDataSource(this.presupuestos)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Versión borrada correctamente",
              showConfirmButton: false,
              toast: true,
              timer: 1500
            });
          },
          error: (data) => {
            console.log(data)
            error()
          }
        })
      }
    });
  }
  
  private versionDto?: VersionDto
  estaCargando = false
  total: number = 0
  presupuestos: PresupuestoDto[] = []
  dataSource = new MatTableDataSource(this.presupuestos)
  columnas= ['cantidad', 'subcategoria','ahorro tipo','id']
  id : number = 0

  constructor(private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.estaCargando = true
    this.servicio.version.obtenerPorId(this.id).subscribe({
      next: (version) => {
        console.log(version)
        this.versionDto = version
        this.estaCargando = false
      }
    })
    this.servicio.version.obtenerPresupuestos(this.id).subscribe({
      next: (data) => {
        this.presupuestos = data
        console.log(this.presupuestos)
        this.dataSource = new MatTableDataSource(this.presupuestos)
        this.presupuestos.forEach(item=>{
          this.total += item.cantidad
        })
      }
    })
  }
}
