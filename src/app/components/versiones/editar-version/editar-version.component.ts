import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../../services/gasto.service';
import { VersionDto, VersionDtoIn } from '../../../interfaces/version-dto';
import { FormularioDeVersionComponent } from "../formulario-de-version/formulario-de-version.component";
import { error, ok } from '../../../helpers/toast';

@Component({
  selector: 'app-editar-version',
  imports: [FormularioDeVersionComponent],
  templateUrl: './editar-version.component.html',
  styleUrl: './editar-version.component.css'
})
export class EditarVersionComponent {
  guardar(version: VersionDtoIn) {
    console.log(version)
    this.estaCargando =true
    this.servicio.version.actualizar(this.versionDto?.id, version).subscribe({
      next: (value) => {
        ok()
        this.router.navigate(['versiones'])
      },
      error: (value)=>{
        error()
        this.estaCargando = false
      }
    })
  }

  estaCargando = false;
  private versionDto?: VersionDto
  versionDtoIn?: VersionDtoIn

  constructor(private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.estaCargando = true
    this.servicio.version.obtenerPorId(id).subscribe({
      next: (version) => {
        console.log(version)
        this.versionDto = version
        this.versionDtoIn = {
          fechaFinal: version.fechaFinal,
          fechaInicial: version.fechaInicial,
          nombre: version.nombre
        }
        this.estaCargando = false
      }
    })
  }
}
