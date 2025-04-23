import { Component } from '@angular/core';
import { FormularioDeAhorroComponent } from "../formulario-de-ahorro/formulario-de-ahorro.component";
import { AhorroDtoIn } from '../../../interfaces/ahorro-dto';
import { GastoService } from '../../../services/gasto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-ahorro',
  imports: [FormularioDeAhorroComponent],
  templateUrl: './agregar-ahorro.component.html',
  styleUrl: './agregar-ahorro.component.css'
})
export class AgregarAhorroComponent {
  estaCArgando = false

  constructor(
    private servicio: GastoService
    , private router: Router
  ) { }

  guardar(ahorro: AhorroDtoIn) {
    //console.log(ahorro)
    this.estaCArgando = true
    this.servicio.ahorro.agregar(ahorro).subscribe({
      next: (data) => {
        console.log(data)        
        this.estaCArgando = false
        this.router.navigate(['/', 'ahorros'])
      }, error: (error) => {
        console.log(error)
        this.estaCArgando = false
      }
    })
  }

}
