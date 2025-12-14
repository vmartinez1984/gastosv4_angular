import { Component, inject } from '@angular/core';
import { GastoService } from '../../../services/gasto.service';
import { CategoriaDto } from '../../../interfaces/categoria-dto';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {
  SubcategoriaDto,
  SubcategoriaDtoIn,
} from '../../../interfaces/subcategoria-dto';
import { generarGuid } from '../../../helpers/guid';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-subcategoria',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './formulario-subcategoria.component.html',
  styleUrl: './formulario-subcategoria.component.css',
})
export class AgregarSubcategoriaComponent {
  formGroup: FormGroup;
  categorias: CategoriaDto[] = [];
  readonly dialogRef = inject(MatDialogRef<AgregarSubcategoriaComponent>);
  readonly subcategoria = inject<SubcategoriaDto>(MAT_DIALOG_DATA);

  constructor(private servicio: GastoService, private formBuild: FormBuilder) {
    this.obtenerCategorias();
    this.formGroup = this.formBuild.group({
      categoriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      presupuesto: ['', Validators.required],
      esPrimario: [false, Validators.required],
      guid: generarGuid(),
    });
    if (this.subcategoria != null) {
      console.log(this.subcategoria);
      this.formGroup.get('guid')?.setValue(this.subcategoria.guid);
      this.formGroup.get('nombre')?.setValue(this.subcategoria.nombre);
      this.formGroup
        .get('categoriaId')
        ?.setValue(this.subcategoria.categoriaId.toString());
      this.formGroup
        .get('presupuesto')
        ?.setValue(this.subcategoria.presupuesto);
      this.formGroup.get('esPrimario')?.setValue(this.subcategoria.esPrimario);
    }
  }

  obtenerCategorias() {
    this.servicio.categoria.obtenerTodos().subscribe({
      next: (categorias) => {
        //console.log(categorias)
        this.categorias = categorias;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  guardar() {
    //console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      let subcategoria: SubcategoriaDtoIn = this.formGroup.value;
      console.log(subcategoria);
      if (this.subcategoria == null) {
        this.servicio.subcategoria.agregar(subcategoria).subscribe({
          next: (data) => {
            this.dialogRef.close(data);
          },
        });
      } else {
        this.servicio.subcategoria.actualizar(this.subcategoria.id, subcategoria).subscribe({
          next: (data) => {
            this.dialogRef.close(data);
          },
        });
      }
    }
  }
}
