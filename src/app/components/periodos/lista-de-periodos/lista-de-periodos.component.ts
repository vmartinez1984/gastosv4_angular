import { Component } from '@angular/core';
import { PeriodoDto } from '../../../interfaces/periodo-dto';
import { GastoService } from '../../../services/gasto.service';
import { error } from '../../../helpers/toast';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-de-periodos',
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './lista-de-periodos.component.html',
  styleUrl: './lista-de-periodos.component.css'
})
export class ListaDePeriodosComponent {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  borrar(ahorro: PeriodoDto) {
    Swal.fire({
      title: "¿Desea borrar el periodo?",
      text: ahorro.nombre,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Un momento...",
          showConfirmButton: false,
          toast: true,
          timer: 1500
        });
        this.servicio.periodo.borrar(ahorro.id).subscribe({
          next: (data) => {
            let index = this.periodos.findIndex(x => x.id == ahorro.id)
            this.periodos.splice(index, 1)
            this.dataSource = new MatTableDataSource(this.periodos)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Periodo borrado correctamente",
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

  constructor(private servicio: GastoService) {
    this.estaCargando = true
    this.servicio.periodo.obtenerTodos().subscribe({
      next: (data) => {
        this.periodos = data
        this.dataSource = new MatTableDataSource(this.periodos)
        this.estaCargando = false
      }, error: (data) => {
        console.log(data)
        this.estaCargando = false
        error()
      }
    })
  }

  estaCargando = false
  periodos: PeriodoDto[] = []
  dataSource = new MatTableDataSource(this.periodos)
  columnas = ['nombre', 'fechas', 'id']
}
