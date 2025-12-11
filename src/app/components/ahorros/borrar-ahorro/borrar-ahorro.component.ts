import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AhorroDto } from '../../../interfaces/ahorro-dto';
import { MaterialModule } from '../../../modules/material/material.module';
import { GastoService } from '../../../services/gasto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-borrar-ahorro',
  imports: [MaterialModule],
  templateUrl: './borrar-ahorro.component.html',
  styleUrl: './borrar-ahorro.component.css',
})
export class BorrarAhorroComponent {
  borrarAhorro() {
    this.estaCargando = true;
    this.service.ahorro.borrar(this.ahorro.id).subscribe((respuesta) => {
      console.log(respuesta);
      this._snackBar.open('Ahorro borrado', '', {
        duration: 3000,
      });
      this.dialogRef.close();
    });
  }
  constructor(private service: GastoService) {
    console.log(this.ahorro);
  }

  estaCargando: boolean = false;
  private _snackBar = inject(MatSnackBar);
  readonly ahorro = inject<AhorroDto>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<BorrarAhorroComponent>);
}
