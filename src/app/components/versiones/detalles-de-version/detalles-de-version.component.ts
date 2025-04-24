import { Component } from '@angular/core';
import { VersionDto } from '../../../interfaces/version-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../../services/gasto.service';
import { PresupuestoDto } from '../../../interfaces/presupuesto-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-de-version',
  imports: [MaterialModule, CommonModule],
  templateUrl: './detalles-de-version.component.html',
  styleUrl: './detalles-de-version.component.css'
})
export class DetallesDeVersionComponent {
borrar(_t39: any) {
throw new Error('Method not implemented.');
}
  private versionDto?: VersionDto
  estaCargando = false
  total: number = 0
  presupuestos: PresupuestoDto[] = []
  dataSource = new MatTableDataSource(this.presupuestos)
  columnas= ['cantidad', 'subcategoria','ahorro tipo','id']

  constructor(private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.estaCargando = true
    this.servicio.version.obtenerPorId(id).subscribe({
      next: (version) => {
        console.log(version)
        this.versionDto = version
        this.estaCargando = false
      }
    })
    this.servicio.version.obtenerPresupuestos(id).subscribe({
      next: (data) => {
        this.presupuestos = data
        console.log(this.presupuestos)
        this.dataSource = new MatTableDataSource(this.presupuestos)
        this.presupuestos.forEach(item=>{
          this.total += item.cantidad
        })
      }
    })
  }
}
