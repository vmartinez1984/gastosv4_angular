import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AhorroDto, AhorroDtoIn } from '../interfaces/ahorro-dto';
import { MovimientoDto, MovimientoDtoIn } from '../interfaces/movimiento-dto';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {
  obtenerAhorroEje():Observable<AhorroDto> {    
    return this.httpClient.get<AhorroDto>(this.url + "Fondeador")
  }
  
  borrar(ahorroId: number):Observable<any> {
    return this.httpClient.delete<any>(this.url + ahorroId )
  }
  retirar(ahorroId: number, deposito: MovimientoDtoIn):Observable<any> {
    return this.httpClient.post<any>(this.url + ahorroId + "/Retiros", deposito)
  }
  depositar(ahorroId: number, deposito: MovimientoDtoIn):Observable<any> {
    return this.httpClient.post<any>(this.url + ahorroId + "/Depositos", deposito)
  }
  obtenerMovimientos(id: number):Observable<MovimientoDto[]> {
    return this.httpClient.get<MovimientoDto[]>(this.url + id+ "/Movimientos")
  }
  actualizar(ahorroId: number, ahorro: AhorroDtoIn): Observable<any> {
    return this.httpClient.put<any>(this.url + ahorroId, ahorro)
  }
  obtenerPorId(id: number): Observable<AhorroDto> {
    return this.httpClient.get<AhorroDto>(this.url + id)
  }

  obtenerTodos(): Observable<AhorroDto[]> {
    return this.httpClient.get<AhorroDto[]>(this.url)
  }

  agregar(ahorro: AhorroDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, ahorro)
  }

  private url = environment.apiUrl + "Ahorros/"
  constructor(private httpClient: HttpClient) { }
}
