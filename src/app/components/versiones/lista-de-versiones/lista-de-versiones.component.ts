import { Component } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { VersionDto, VersionDtoIn } from '../../../interfaces/version-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { error, unMomento } from '../../../helpers/toast';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-de-versiones',
  imports: [MaterialModule, CommonModule],
  templateUrl: './lista-de-versiones.component.html',
  styleUrl: './lista-de-versiones.component.css'
})
export class ListaDeVersionesComponent {
  borrar(version: VersionDto) {
    Swal.fire({
      title: "¿Desea borrar el ahorro?",
      text: version.nombre,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        unMomento()
        this.servicio.version.borrar(version.id).subscribe({
          next: (data) => {
            let index = this.versiones.findIndex(x => x.id == version.id)
            console.log(index)
            this.versiones.splice(index, 1)
            console.log(this.versiones)
            this.dataSource = new MatTableDataSource(this.versiones)
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
  versiones: VersionDto[] = []
  columnas = ['nombre', 'fechas', 'id']
  estaCargando: any;
  dataSource = new MatTableDataSource(this.versiones)

  constructor(private servicio: GastoService) {
    this.obtenerTodos()
  }

  obtenerTodos() {
    this.servicio.version.obtenerTodos().subscribe({
      next: (versiones) => {
        this.versiones = versiones
        this.dataSource = new MatTableDataSource(this.versiones)
        //console.log(versiones)
      }
    })
  }

}