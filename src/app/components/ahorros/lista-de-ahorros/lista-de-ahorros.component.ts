import { Component, PipeTransform } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-de-ahorros',
  imports: [MaterialModule, MatSortModule],
  templateUrl: './lista-de-ahorros.component.html',
  styleUrl: './lista-de-ahorros.component.css'
})
export class ListaDeAhorrosComponent {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ahorros: AhorroDto[]=[]
  estaCargando= false
  dataSource = new MatTableDataSource(this.ahorros)
  
  constructor(private servicio: GastoService){
    this.estaCargando = true
    this.servicio.ahorro.obtenerTodos().subscribe({
      next:(ahorros)=>{
        //console.log(ahorros)
        this.ahorros = ahorros
        this.dataSource = new MatTableDataSource(this.ahorros)
        this.estaCargando = false
      }
    })
  }

  columnas = ['nombre', 'tipoDeAhorro', 'balance', 'id'];
}
