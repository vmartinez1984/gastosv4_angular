import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SesionService } from "./sesion.service";

@Injectable({
    providedIn: 'root'
})
export class SesionGuard implements CanActivate {

    constructor(private servicio: SesionService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
         if (this.servicio.estaIniciadaLaSesion()) {
            return true
        } else {
            console.log("Redirigiendo a inicio de sesión")
            this.router.navigate(['/', 'inicioDeSesion'])
            return false
        }
    }
}
