import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { SesionService } from '../../modules/inicio-de-sesion/services/sesion.service';

@Component({
  selector: 'app-menu',
  imports: [MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private servicio: SesionService, private router: Router) { }

  cerrarSesion() {
    this.servicio.cerrarSesion()    
    this.router.navigate(['/','inicioDeSesion'])

  }

  estaIniciadaLaSesion(): boolean {
    return this.servicio.estaIniciadaLaSesion()
  }

}
