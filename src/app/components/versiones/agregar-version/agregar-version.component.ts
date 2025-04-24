import { Component } from '@angular/core';
import { FormularioDeVersionComponent } from "../formulario-de-version/formulario-de-version.component";
import { VersionDtoIn } from '../../../interfaces/version-dto';
import { GastoService } from '../../../services/gasto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-version',
  imports: [FormularioDeVersionComponent, FormularioDeVersionComponent],
  templateUrl: './agregar-version.component.html',
  styleUrl: './agregar-version.component.css'
})
export class AgregarVersionComponent {
  guardar(version: VersionDtoIn) {
    console.log(version)
    this.estaCargando = true
    this.servicio.version.agregar(version).subscribe({
      next: (data)=>{
        this.router.navigate(['versiones'])
      }
    })
  }

  estaCargando = false

  constructor(private servicio: GastoService, private router: Router){}
}
