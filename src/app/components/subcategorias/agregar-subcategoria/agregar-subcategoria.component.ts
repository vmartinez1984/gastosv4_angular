import { Component } from '@angular/core';
import { GastoService } from '../../../services/gasto.service'
import { CategoriaDto } from '../../../interfaces/categoria-dto'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { SubcategoriaDtoIn } from '../../../interfaces/subcategoria-dto';
import { Router } from '@angular/router';
import { generarGuid } from '../../../helpers/guid';

@Component({
  selector: 'app-agregar-subcategoria',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './agregar-subcategoria.component.html',
  styleUrl: './agregar-subcategoria.component.css'
})
export class AgregarSubcategoriaComponent {
  formGroup: FormGroup
  categorias : CategoriaDto[] = []

  constructor(
    private servicio: GastoService, 
    private formBuild: FormBuilder,
    private router: Router
  ){
    this.obtenerCategorias()
    this.formGroup = this.formBuild.group({
      categoriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      presupuesto: ['', Validators.required],
      esPrimario: [false, Validators.required],
      guid: generarGuid()
    })
  }

  obtenerCategorias() {
    this.servicio.categoria.obtenerTodos().subscribe({
      next:(categorias)=>{
        //console.log(categorias)
        this.categorias = categorias
      }, error: (error)=>{
        console.log(error)
      }
    })
  }

  guardar(){
    console.log(this.formGroup.value)
    if(this.formGroup.valid){
      let subcategoria : SubcategoriaDtoIn = this.formGroup.value
      //console.log(subcategoria)
      this.servicio.subcategoria.agregar(subcategoria).subscribe({
        next:(data)=>{
          this.router.navigate(['subcategorias'])
        }
      })
    }
  }
}
