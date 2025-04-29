import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresupuestoDto, PresupuestoDtoIn } from '../interfaces/presupuesto-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {

  agregarPresupuesto(presupuesto: PresupuestoDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, presupuesto)
  }

  borrarPresupuesto(versionId: number | undefined, presupuestoId: any) {
    return this.httpClient.delete<any>(this.url + versionId + "/Presupuestos/" + presupuestoId)
  }
  actualizarPresupuesto(presupuestoId: number, presupuesto: PresupuestoDtoIn): Observable<any> {
    return this.httpClient.put<any>(this.url + presupuestoId, presupuesto)
  }
  obtenerPresupuesto(presupuestoId: number): Observable<PresupuestoDto> {
    console.log(this.url + presupuestoId)
    return this.httpClient.get<PresupuestoDto>(this.url +  presupuestoId)
  }

  constructor(private httpClient: HttpClient) { }
  private url = environment.apiUrl + "Presupuestos/"
}
