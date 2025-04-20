import { Component } from '@angular/core'
import { GastoService } from '../../../services/gasto.service'
import { SubcategoriaDto } from '../../../interfaces/subcategoria-dto'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-lista-de-subcategorias',
  imports: [MatTableModule, MatIconModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './lista-de-subcategorias.component.html',
  styleUrl: './lista-de-subcategorias.component.css'
})
export class ListaDeSubcategoriasComponent {
  columnsToDisplay = ['nombre', 'presupuesto', 'primario', 'id'];
  subcategorias: SubcategoriaDto[] = []
  estaCargando = false

  constructor(private servicio: GastoService) {
    this.obtenerTodos()
  }
  obtenerTodos() {
    this.estaCargando = true
    this.servicio.subcategoria.obtenerTodos().subscribe({
      next: (subcategorias) => {
        //console.log(subcategorias)
        this.subcategorias = subcategorias
        this.estaCargando = false
      }
    })
  }
}
