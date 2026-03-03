import { Component, inject } from '@angular/core';
import { CompraTdcService } from '../../services/compra-tdc.service';
import { CompraDto, ListaDeCompras } from '../../interfaces/compra-dto';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgregarCompraComponent } from '../agregar-compra/agregar-compra.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TablaDeComprasComponent } from '../tabla-de-compras/tabla-de-compras.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-lista-de-compras',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinner,
    TablaDeComprasComponent
  ],
  templateUrl: './lista-de-compras.component.html',
  styleUrl: './lista-de-compras.component.css',
})
export class ListaDeComprasComponent {
  total = 0;

  abrirDialogoAgregarCompra() {
    const dialogRef = this.dialog.open(AgregarCompraComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.obtenerTodos();
    });
  }

  compras: CompraDto[] = [];
  readonly dialog = inject(MatDialog);
  listaDeCompras: ListaDeCompras[]=[]
  estaCargando = false

  constructor(private servicio: CompraTdcService) {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.estaCargando = true
    this.servicio.obtenerComprasTdc().subscribe({
      next: (compras) => {
        this.listaDeCompras = compras;
        console.log(compras);
        this.total = compras.reduce((acc, compra) => acc + compra.total, 0);
        this.estaCargando = false
      },
    });
  }
}
