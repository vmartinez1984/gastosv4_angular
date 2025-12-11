import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GastoService } from '../../../services/gasto.service';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { MovimientoDto } from '../../../interfaces/movimiento-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { error } from '../../../helpers/toast';
import { MatDialog } from '@angular/material/dialog';
import { DepositoComponent } from '../deposito/deposito.component';
import { RetiroComponent } from '../retiro/retiro.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalles-del-ahorro',
  imports: [MaterialModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './detalles-del-ahorro.component.html',
  styleUrl: './detalles-del-ahorro.component.css',
})
export class DetallesDelAhorroComponent {
  retirar() {
    const dialogRef = this.dialog.open(RetiroComponent, {
      data: this.ahorroDto,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this._snackBar.open('Retiro realizado', result.id, {
        duration: 3000,
      });
      this.obtenerAhorro(this.ahorroId);
      this.obtenerMovimientos(this.ahorroId);
    });
  }
  readonly dialog = inject(MatDialog);
  depositar() {
    const dialogRef = this.dialog.open(DepositoComponent, {
      data: this.ahorroDto,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this._snackBar.open('Depósito realizado', result.id, {
        duration: 3000,
      });
      this.obtenerAhorro(this.ahorroId);
      this.obtenerMovimientos(this.ahorroId);
    });
  }

  estaCargando = false;
  ahorroDto?: AhorroDto;
  movimientos: MovimientoDto[] = [];
  columnas = [
    'saldoInicial',
    'cantidad',
    'saldoFinal',
    'concepto',
    'fechaDeRegistro',
  ];
  ahorroId: number = 0;
  private _snackBar = inject(MatSnackBar);

  constructor(
    private activatedRoute: ActivatedRoute,
    private servicio: GastoService
  ) {
    this.ahorroId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.obtenerAhorro(this.ahorroId);
    this.obtenerMovimientos(this.ahorroId);
  }

  obtenerAhorro(id: number) {
    this.estaCargando = true;
    this.servicio.ahorro.obtenerPorId(id).subscribe({
      next: (ahorro) => {
        console.log(ahorro);
        this.ahorroDto = ahorro;
        this.estaCargando = false;
      },
      error: (data) => {
        error();
      },
    });
  }

  obtenerMovimientos(id: number) {
    this.servicio.ahorro.obtenerMovimientos(id).subscribe({
      next: (movimientos) => {
        //console.log(movimientos)
        this.movimientos = movimientos;
      },
    });
  }
}
