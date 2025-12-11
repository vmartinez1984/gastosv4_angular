import { Component, inject } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { error } from '../../../helpers/toast';
import { RouterModule } from '@angular/router';
import { TipoDeAhorroDto } from '../../../interfaces/tipo-de-ahorro-dto';
import { MatDialog } from '@angular/material/dialog';
import { FormularioDeAhorroComponent } from '../formulario-de-ahorro/formulario-de-ahorro.component';
import { BorrarAhorroComponent } from '../borrar-ahorro/borrar-ahorro.component';

@Component({
  selector: 'app-lista-de-ahorros',
  imports: [MaterialModule, MatSortModule, CommonModule, RouterModule],
  templateUrl: './lista-de-ahorros.component.html',
  styleUrl: './lista-de-ahorros.component.css',
})
export class ListaDeAhorrosComponent {
  editar(ahorroDto: AhorroDto) {
    console.log(ahorroDto);
    const dialogRef = this.dialog.open(FormularioDeAhorroComponent, {
      data: ahorroDto,
    });
  }
  readonly dialog = inject(MatDialog);

  agregarAhorro() {
    const dialogRef = this.dialog.open(FormularioDeAhorroComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.obtenerAhorros();
    });
  }

  borrarAhorro(ahorro: AhorroDto) {
    const dialogRef = this.dialog.open(BorrarAhorroComponent, {
      data: ahorro,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.obtenerAhorros();
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
    this.obtenerAhorros();
  }

  obtenerAhorros() {
    this.total = 0;
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
