import { Component } from '@angular/core';
import { CompraTdcService } from '../../services/compra-tdc.service';
import { CompraDto } from '../../interfaces/compra-dto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MaterialModule } from '../../../../modules/material/material.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-de-compras',
  imports: [MaterialModule, MatSortModule, CommonModule, RouterModule],
  templateUrl: './lista-de-compras.component.html',
  styleUrl: './lista-de-compras.component.css',
})
export class ListaDeComprasComponent {
  compras: CompraDto[] = [];
  dataSource = new MatTableDataSource(this.compras)
  columnas = ["nombre",'monto','saldo','fechaDeCompra']

  constructor(private servicio: CompraTdcService) {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.servicio.obtenerComprasTdc().subscribe({
      next: (compras) => {
        this.compras = compras;
        console.log(compras);
        this.dataSource = new MatTableDataSource(this.compras);
      },
    });
  }
}
