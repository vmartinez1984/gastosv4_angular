import { Component, inject } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { VersionDto } from '../../../interfaces/version-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormularioDeVersionComponent } from '../formulario-de-version/formulario-de-version.component';
import { BorrarElementoComponent } from '../../borrar-elemento/borrar-elemento.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista-de-versiones',
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './lista-de-versiones.component.html',
  styleUrl: './lista-de-versiones.component.css',
})
export class ListaDeVersionesComponent {
  editar(version: VersionDto) {
    const dialogRef = this.dialog.open(FormularioDeVersionComponent, {
      data: version,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.obtenerTodos();
      }
    });
  }

  readonly dialog = inject(MatDialog);
  agregar() {
    const dialogRef = this.dialog.open(FormularioDeVersionComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.obtenerTodos();
      }
    });
  }

  private _snackBar = inject(MatSnackBar);
  borrar(version: VersionDto) {
    const dialogRef = this.dialog.open(BorrarElementoComponent, {
      data: {
        titulo: '¿Desea borrar la versión?',
        mensaje: version.nombre,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.servicio.version.borrar(version.id).subscribe({
          next: (data) => {
            let index = this.versiones.findIndex((x) => x.id == version.id);
            console.log(index);
            this.versiones.splice(index, 1);
            console.log(this.versiones);
            this.dataSource = new MatTableDataSource(this.versiones);
            this._snackBar.open('Ahorro borrado', 'Cerrar', {
              duration: 3000,
            });
          },
          error: (data) => {
            console.log(data);
          },
        });
      }
    });
  }
  versiones: VersionDto[] = [];
  columnas = ['nombre', 'fechas', 'id'];
  estaCargando: any;
  dataSource = new MatTableDataSource(this.versiones);

  constructor(private servicio: GastoService) {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.estaCargando = true;
    this.servicio.version.obtenerTodos().subscribe({
      next: (versiones) => {
        this.versiones = versiones;
        this.dataSource = new MatTableDataSource(this.versiones);
        //console.log(versiones)
        this.estaCargando = false;
      },
    });
  }
}
