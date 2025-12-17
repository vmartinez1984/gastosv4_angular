import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MaterialModule } from '../../modules/material/material.module';

@Component({
  selector: 'app-borrar-elemento',
  imports: [MaterialModule, MatDialogModule, ],
  templateUrl: './borrar-elemento.component.html',
  styleUrl: './borrar-elemento.component.css'
})
export class BorrarElementoComponent {
readonly data = inject<BorrarElementoData>(MAT_DIALOG_DATA);
readonly dialogRef = inject(MatDialogRef<BorrarElementoComponent>);

guardar(){
  this.dialogRef.close(true);
}

}

export interface BorrarElementoData {
  titulo: string;
  mensaje: string;
}
