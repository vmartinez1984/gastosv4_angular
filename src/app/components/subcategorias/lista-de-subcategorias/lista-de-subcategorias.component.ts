import { Component } from '@angular/core'
import { GastoService } from '../../../services/gasto.service'
import { SubcategoriaDto } from '../../../interfaces/subcategoria-dto'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatButtonModule } from '@angular/material/button'
import { CategoriaDto } from '../../../interfaces/categoria-dto'
import Swal from 'sweetalert2'
import { error, unMomento } from '../../../helpers/toast'

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
  dataSource = new MatTableDataSource(this.subcategorias)

  constructor(private servicio: GastoService) {
    this.obtenerTodos()
  }

  obtenerTodos() {
    this.estaCargando = true
    this.servicio.subcategoria.obtenerTodos().subscribe({
      next: (subcategorias) => {
        //console.log(subcategorias)
        this.subcategorias = subcategorias
        this.dataSource = new MatTableDataSource(this.subcategorias)
        this.estaCargando = false
      }
    })
  }

  borrar(subcategoria: SubcategoriaDto) {
    Swal.fire({
      title: "¿Desea borrar la subcategoria?",
      text: subcategoria.nombre,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Borrar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        unMomento()        
        this.servicio.subcategoria.borrar(subcategoria.id).subscribe({
          next: (data) => {
            let index = this.subcategorias.findIndex(x => x.id == subcategoria.id)            
            this.subcategorias.splice(index, 1)
            this.dataSource = new MatTableDataSource(this.subcategorias)
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Subcategoria borrado correctamente",
              showConfirmButton: false,
              toast: true,
              timer: 1500
            });
          },
          error:(data)=>{
            console.log(data)
            error()
          }
        })
      }
    });
  }
}
