import { Component, PipeTransform } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { AhorroDto, TipoDeAhorro } from '../../../interfaces/ahorro-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { error, unMomento } from '../../../helpers/toast';
import { RouterModule } from '@angular/router';
import { TipoDeAhorroDto } from '../../../interfaces/tipo-de-ahorro-dto';

@Component({
  selector: 'app-lista-de-ahorros',
  imports: [MaterialModule, MatSortModule, CommonModule, RouterModule],
  templateUrl: './lista-de-ahorros.component.html',
  styleUrl: './lista-de-ahorros.component.css',
})
export class ListaDeAhorrosComponent {
  borrarAhorro(ahorro: AhorroDto) {
    Swal.fire({
      title: '¿Desea borrar el ahorro?',
      text: ahorro.nombre + ' ' + ahorro.tipoDeAhorroNombre,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        unMomento();
        this.servicio.ahorro.borrar(ahorro.id).subscribe({
          next: (data) => {
            let index = this.ahorros.findIndex((x) => x.id == ahorro.id);
            this.ahorros.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.ahorros);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Ahorro borrado correctamente',
              showConfirmButton: false,
              toast: true,
              timer: 1500,
            });
          },
          error: (data) => {
            console.log(data);
            error();
          },
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource.filteredData)
    this.total = 0;
    this.dataSource.filteredData.forEach((item) => {
      this.total += item.balance;
    });
  }

  ahorros: AhorroDto[] = [];
  tipoDeAhorros: TipoDeAhorroDto[] = [];
  estaCargando = false;
  dataSource = new MatTableDataSource(this.ahorros);
  total: number = 0;

  constructor(private servicio: GastoService) {
    this.estaCargando = true;
    this.servicio.tipoDeAhorro.obtenerTodos().subscribe({
      next: (tipoDeAhorros) => {
        this.tipoDeAhorros = tipoDeAhorros;
      },
    });
    this.servicio.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        //console.log(ahorros)
        this.ahorros = ahorros;
        this.estaCargando = false;
        this.ahorros.forEach((item) => {
          this.total = this.total + item.balance;
          let tipoDeAhorro = this.tipoDeAhorros.find(
            (x) => x.id == item.tipoDeAhorroId
          );
          item.tipoDeAhorroNombre =
            tipoDeAhorro == undefined ? 'na' : tipoDeAhorro.nombre;
        });
        this.dataSource = new MatTableDataSource(this.ahorros);
      },
      error: (data) => {
        console.log(data);
        this.estaCargando = false;
        error();
      },
    });
  }

  columnas = ['nombre', 'tipoDeAhorroNombre', 'balance', 'id'];
}
