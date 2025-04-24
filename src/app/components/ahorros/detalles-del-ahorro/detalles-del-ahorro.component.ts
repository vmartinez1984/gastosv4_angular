import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../../services/gasto.service';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { MovimientoDto } from '../../../interfaces/movimiento-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import {MatCardModule} from '@angular/material/card';
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalles-del-ahorro',
  imports: [MaterialModule, MatCardModule, CommonModule],
  templateUrl: './detalles-del-ahorro.component.html',
  styleUrl: './detalles-del-ahorro.component.css'
})
export class DetallesDelAhorroComponent {
  estaCargando= false;
  ahorroDto?: AhorroDto;
  movimientos: MovimientoDto[]=[]
  columnas = [ 'saldoInicial','cantidad','saldoFinal',  'concepto', 'fechaDeRegistro']
  ahorroId: number = 0  

  constructor(private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    this.ahorroId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.obtenerAhorro(this.ahorroId)
    this.obtenerMovimientos(this.ahorroId)
  }

  obtenerAhorro(id: number) {
    this.servicio.ahorro.obtenerPorId(id).subscribe({
      next: (ahorro) => {
        console.log(ahorro)
        this.ahorroDto = ahorro        
      }
    })
  }

  obtenerMovimientos(id: number){
    this.servicio.ahorro.obtenerMovimientos(id).subscribe({
      next:(movimientos)=>{
        //console.log(movimientos)
        this.movimientos = movimientos
      }
    })
  }

}
