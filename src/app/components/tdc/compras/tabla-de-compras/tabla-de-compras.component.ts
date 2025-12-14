import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { CompraDto } from '../../interfaces/compra-dto';
import { MatDialog } from '@angular/material/dialog';
import { PagarCompraComponent } from '../pagar-compra/pagar-compra.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tabla-de-compras',
  imports: [
    MatSortModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
  ],
  templateUrl: './tabla-de-compras.component.html',
  styleUrl: './tabla-de-compras.component.css',
})
export class TablaDeComprasComponent {
  pagarCompra(compra: CompraDto) {
    console.log('Pagar compra', compra);
    const dialogRef = this.dialog.open(PagarCompraComponent, {
      data: compra,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.recalcular(result, compra);
      this._snackBar.open('Pago realizado con éxito', result.id, {
        duration: 3000,
      });
      console.log('El diálogo se cerró');
    });
  }
  recalcular(result: any, compraOriginal: CompraDto) {
    let compra = this.compras.find((c) => c.id === 0);
    compra!.monto -= result.pago;
    compra!.saldo -= result.pago;
    let compra01 = this.compras.find((c) => c.id === compraOriginal.id);
    if (compra01) compra01.saldo -= result.pago;
    this.dataSource = new MatTableDataSource(this.compras);
  }

  readonly dialog = inject(MatDialog);
  readonly _snackBar = inject(MatSnackBar);
  @Input() compras: CompraDto[] = [];
  dataSource = new MatTableDataSource(this.compras);
  columnas = [
    'nombre',
    'monto',
    'saldo',
    'fechaDeCompra',
    'fechaDePago',
    'acciones',
  ];

  ngOnChanges() {
    if (this.compras != undefined && this.compras.length > 0) {
      let compra: CompraDto = {
        nombre: 'Pago del mes',
        monto: this.compras.reduce((suma, item) => suma + item.saldo, 0),
        saldo: this.compras.reduce((suma, item) => suma + item.saldo, 0),
        fechaDeCompra: undefined,
        fechaDeRegistro: new Date(),
        mesesSinIntereses: 0,
        id: 0,
        encodedkey: '',
        nota: '',
      };
      this.compras.push(compra);
      //console.log('TablaDeComprasComponent - ngOnChanges', this.compras);
      this.dataSource = new MatTableDataSource(this.compras);
    }
  }
}
