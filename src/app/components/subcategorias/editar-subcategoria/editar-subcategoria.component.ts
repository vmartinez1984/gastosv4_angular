import { Component } from '@angular/core';
import { MaterialModule } from '../../../modules/material/material.module';
import { GastoService } from '../../../services/gasto.service';
import { CategoriaDto } from '../../../interfaces/categoria-dto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubcategoriaDto, SubcategoriaDtoIn } from '../../../interfaces/subcategoria-dto';

@Component({
  selector: 'app-editar-subcategoria',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './editar-subcategoria.component.html',
  styleUrl: './editar-subcategoria.component.css'
})
export class EditarSubcategoriaComponent {
  formGroup: FormGroup
  categorias: CategoriaDto[] = []
  subcategoria?: SubcategoriaDto
  estaCargando = false

  constructor(
    private servicio: GastoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.obtenerCategorias()
    this.formGroup = this.formBuilder.group({
      categoriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      presupuesto: ['', Validators.required],
      esPrimario: [false, Validators.required],
      guid: ['']
    })
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.obtenerSubcategoriaPorId(id)
  }

  obtenerSubcategoriaPorId(id: number) {
    this.servicio.subcategoria.obtenerPorId(id).subscribe({
      next: (subcategoria) => {
        this.subcategoria = subcategoria
        this.formGroup.patchValue({
          categoriaId: subcategoria.categoriaId.toString(),
          nombre: subcategoria.nombre,
          presupuesto: subcategoria.presupuesto,
          esPrimario: subcategoria.esPrimario,
          guid: subcategoria.guid
        })
      }
    })
  }

  obtenerCategorias() {
    this.servicio.categoria.obtenerTodos().subscribe({
      next: (categorias) => {
        //console.log(categorias)
        this.categorias = categorias
      }, error: (error) => {
        console.log(error)
      }
    })
  }

  guardar() {
    //console.log(this.formGroup.value)
    let subcategoria: SubcategoriaDtoIn = this.formGroup.value
    console.log(subcategoria)
    this.estaCargando = true
    this.formGroup.disable()
    this.servicio.subcategoria.actualizar(Number(this.subcategoria?.id), subcategoria).subscribe({
      next: (data) => {
        this.router.navigate(['/subcategorias'])
      }
    })
  }
}
