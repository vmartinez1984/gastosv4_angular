import { Component } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { ActivatedRoute } from '@angular/router';
import { PresupuestoDto } from '../../../interfaces/presupuesto-dto';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../modules/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-de-periodo',
  imports: [MaterialModule, CommonModule],
  templateUrl: './detalle-de-periodo.component.html',
  styleUrl: './detalle-de-periodo.component.css'
})
export class DetalleDePeriodoComponent {
borrar(_t51: any) {
throw new Error('Method not implemented.');
}
  obtenerVersion(id: number){
    this.servicio.version.obtenerPresupuestos(id).subscribe({
      next:(data)=>{
        console.log(data)
        this.dataSource = new MatTableDataSource(data)
      }
    })
  }

  constructor(private servicio: GastoService, private activatedRoute: ActivatedRoute){
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.servicio.periodo.obtenerPorId(id).subscribe({
      next:(data)=>{
        console.log(data)
        this.obtenerVersion(data.versionId)
      }
    })    
  }


  estaCargando = false
  total: number = 0
  presupuestos: PresupuestoDto[] = []
  dataSource = new MatTableDataSource(this.presupuestos)
  columnas= ['cantidad', 'subcategoria','ahorro tipo','id']
  id : number = 0
}
