import { Component, inject, signal } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { PresupuestoDelPeriodoDto } from '../../../interfaces/presupuesto-del-periodo-dto';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { FormularioDeMovimientoComponent } from '../formulario-de-movimiento/formulario-de-movimiento.component';
import { SubcategoriaDto } from '../../../interfaces/subcategoria-dto';
import { TipoDeAhorroDto } from '../../../interfaces/tipo-de-ahorro-dto';
import { PeriodoDto } from '../../../interfaces/periodo-dto';
import { TransaccionDto } from '../../../interfaces/transaccion-dto';
import { concatMap, tap } from 'rxjs';

@Component({
  selector: 'app-detalle-de-periodo',
  imports: [MaterialModule, CommonModule, MatCardModule, RouterModule],
  templateUrl: './detalle-de-periodo.component.html',
  styleUrl: './detalle-de-periodo.component.css',
})
export class DetalleDePeriodoComponent {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async mostrarFormulario(presupuesto: PresupuestoDelPeriodoDto) {
    console.log(presupuesto);
    const dialogRef = this.dialog.open(FormularioDeMovimientoComponent, {
      data: { presupuesto, periodoId: this.periodo?.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (this.ahorro?.balance)
        this.ahorro.balance =
          Number(this.ahorro.balance) - Number(result.cantidad);
      let index = this.presupuestos.findIndex((x) => x.id == presupuesto.id);
      this.presupuestos[index].gastado =
        Number(result.cantidad) + Number(this.presupuestos[index].gastado);
      this.dataSource = new MatTableDataSource(this.presupuestos);
    });
  }

  constructor(
    private servicio: GastoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.estaCargando = true;
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.servicio.ahorro
      .obtenerAhorroEje()
      .pipe(
        concatMap((ahorroEje) =>
          this.servicio.periodo.obtenerPorId(id).pipe(
            concatMap((periodo) =>
              this.servicio.subcategoria.obtenerTodos().pipe(
                concatMap((subcategorias) =>
                  this.servicio.periodo
                    .obtenerTodasTransacciones(periodo.id)
                    .pipe(
                      concatMap((transacciones) =>
                        this.servicio.periodo
                          .obtenerPresupuestos(periodo.id)
                          .pipe(
                            tap((presupuestos) => {
                              this.ahorro = ahorroEje;
                              this.periodo = periodo;
                              this.subcategorias = subcategorias;
                              this.transacciones = transacciones;
                              this.presupuestos = presupuestos;
                              this.presupuestos.forEach((item) => {
                                let subcategoria = this.subcategorias.find(
                                  (x) => x.id == item.subcategoriaId
                                );
                                item.subcategoriaNombre =
                                  subcategoria == undefined
                                    ? 'na'
                                    : subcategoria.nombre;
                                let transacciones = this.transacciones.filter(
                                  (x) => x.presupuestoId == item.id
                                );
                                let gastado = 0;
                                for (
                                  let index = 0;
                                  index < transacciones.length;
                                  index++
                                ) {
                                  const element = transacciones[index];
                                  gastado += element.cantidad;
                                }
                                item.gastado = gastado;
                              });
                              this.dataSource = new MatTableDataSource(
                                this.presupuestos
                              );
                              this.gastado = 0;
                              this.presupuestos.forEach((item) => {
                                this.gastado = this.gastado + item.gastado;
                              });
                              this.estaCargando = false;
                            })
                          )
                      )
                    )
                )
              )
            )
          )
        )
      )
      .subscribe({
        error: (err) => {
          console.error(err);
          this.estaCargando = false;
        },
      });
  }

  calcularAamarillo(monto: number) {
    return monto / 1.1;
  }
  calcularAverde(monto: number) {
    return monto * 1.1;
  }

  estaCargando = false;
  total: number = 0;
  gastado: number = 0;
  presupuestos: PresupuestoDelPeriodoDto[] = [];
  dataSource = new MatTableDataSource(this.presupuestos);
  columnas = ['cantidad', 'subcategoria', 'tipoDeAhorro', 'gastado', 'id'];
  readonly dialog = inject(MatDialog);
  id: number = 0;
  ahorro?: AhorroDto;
  readonly cantida = signal('');
  subcategorias: SubcategoriaDto[] = [];
  tiposDeAhorro: TipoDeAhorroDto[] = [];
  periodo?: PeriodoDto;
  transacciones: TransaccionDto[] = [];
}

export interface DialogData {
  presupuesto: PresupuestoDelPeriodoDto;
  periodoId: number;
  cantidad: number;
}
