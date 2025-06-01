import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenDto } from '../interfaces/token-dto';
import { InicioDeSesionDto } from '../interfaces/inicio-de-sesion-dto';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  obtenerNombre() {
    return this.obtenerCampo("Nombre")
  }   
  private readonly llaveToken = 'token'
  private readonly llaveExpiracion = 'expiracion'
  url: string = environment.apiUrl +"InicioDeSesiones"

  constructor(private httpClient: HttpClient) { }

  /**
   * Indica que este iniciada la sesion y vigente
   * @returns true | false
   */
  estaIniciadaLaSesion(): boolean {
    const token = localStorage.getItem(this.llaveToken)
    //console.log(token)
    //console.log("verificando autenicacion")
    if (!token) {
      //console.log("No ha iniciado sesion")
      return false
    } else {
      const expiracion = localStorage.getItem(this.llaveExpiracion)
      const fechaDeExpiracion = new Date(expiracion!)
      if (fechaDeExpiracion <= new Date()) {
        this.cerrarSesion()
        return false
      }
      console.log("Sesion iniciada")
      return true
    }
  }

  guardarToken(token: TokenDto) {
    localStorage.setItem(this.llaveExpiracion, token.fechaDeExpiracion.toString())
    localStorage.setItem(this.llaveToken, token.token)
  }

  iniciarSesion(inicioDeSesion: InicioDeSesionDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(this.url, inicioDeSesion)
  }

  cerrarSesion() {
    localStorage.removeItem(this.llaveExpiracion)
    localStorage.removeItem(this.llaveToken)
    console.log("Cierre de sesion")    
  }

  obtenerToken() {
    const token = localStorage.getItem(this.llaveToken)

    return token
  }

  obtenerCampo(campo: string): string {
    const token = localStorage.getItem(this.llaveToken)
    //console.log(JSON.parse(atob(token!.split('.')[1])))
    if (!token)
      return ''

    var dataToken = JSON.parse(atob(token.split('.')[1]))

    return dataToken[campo]
  }
}
