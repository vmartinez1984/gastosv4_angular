import { Component } from '@angular/core';
import { FormularioDeAhorroComponent } from '../formulario-de-ahorro/formulario-de-ahorro.component';
import { AhorroDto, AhorroDtoIn } from '../../../interfaces/ahorro-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { GastoService } from '../../../services/gasto.service';

@Component({
  selector: 'app-editar-ahorro',
  imports: [FormularioDeAhorroComponent],
  templateUrl: './editar-ahorro.component.html',
  styleUrl: './editar-ahorro.component.css'
})
export class EditarAhorroComponent {
  estaCArgando: boolean = false
  ahorroDtoIn?: AhorroDtoIn
  ahorroDto?: AhorroDto
  constructor(private activatedRoute: ActivatedRoute, private servicio: GastoService, private router: Router) {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.obtenerAhorro(id)
  }

  obtenerAhorro(id: number) {
    this.servicio.ahorro.obtenerPorId(id).subscribe({
      next: (ahorro) => {
        console.log(ahorro)
        this.ahorroDto = ahorro
        this.ahorroDtoIn = {
          fechaFinal: ahorro.fechaFinal,
          fechaInicial: ahorro.fechaInicial,
          guid: ahorro.guid,
          nombre: ahorro.nombre,
          tipoDeAhorroId: ahorro.tipoDeAhorroId
        }
      }
    })
  }

  guardar(ahorro: AhorroDtoIn) {
    this.estaCArgando = true
    this.servicio.ahorro.actualizar(Number(this.ahorroDto?.id), ahorro).subscribe({
      next: (data) => {
        console.log(data)
        this.estaCArgando = false
        this.router.navigate(['/','ahorros'])
      }, error: (errro) => {
        this.estaCArgando = false
        console.log(errro)
      }
    })
  }

}
