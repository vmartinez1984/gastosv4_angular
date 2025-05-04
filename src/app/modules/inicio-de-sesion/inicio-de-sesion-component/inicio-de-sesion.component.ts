import { Component, inject, signal } from '@angular/core'
import { SesionService } from '../services/sesion.service'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MaterialModule } from '../../material/material.module'
import { MatSnackBar } from '@angular/material/snack-bar'
import { InicioDeSesionDto } from '../interfaces/inicio-de-sesion-dto'
import { Router } from '@angular/router'

@Component({
  selector: 'app-inicio-de-sesion',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './inicio-de-sesion.component.html',
  styleUrl: './inicio-de-sesion.component.css'
})
export class InicioDeSesionComponent {
  formGroup: FormGroup
  private _snackBar = inject(MatSnackBar)

  constructor(private servicio: SesionService, private formBuilder: FormBuilder, private router: Router) {
    this.formGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    })
  }

  iniciarSesion() {
    if (this.formGroup.valid) {
      let inicioDeSesion: InicioDeSesionDto = {
        usuario: this.formGroup.value.usuario,
        contraseña: this.formGroup.value.contraseña
      }
      this.servicio.iniciarSesion(inicioDeSesion).subscribe({
        next: (token) => {
          //console.log(token)
          this.servicio.guardarToken(token)
          this.router.navigate(['/'])
          this._snackBar.open("Bienvenido "+ this.servicio.obtenerNombre(), "", {
            duration: 3000
          })
        },
        error: (data) => {
          console.log(data)
          this._snackBar.open("Ocurrio un error", "valio pepino", {
            duration: 3000
          })
        }
      })
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
