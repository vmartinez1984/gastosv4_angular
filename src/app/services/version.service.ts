import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { VersionDto, VersionDtoIn } from '../interfaces/version-dto';
import { PresupuestoDto, PresupuestoDtoIn } from '../interfaces/presupuesto-dto';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  borrarPresupuesto(versionId: number | undefined, presupuestoId: any) {
    return this.httpClient.delete<any>(this.url + versionId + "/Presupuestos/" +presupuestoId)
  }
  actualizarPresupuesto(versionId: number, presupuestoId: number, presupuesto: PresupuestoDtoIn):Observable<any> {
    return this.httpClient.put<any>(this.url + versionId + "/Presupuestos/" +presupuestoId, presupuesto)
  }
  obtenerPresupuesto(versionId: number, presupuestoId: number):Observable<PresupuestoDto> {
    console.log(this.url + versionId + "/Presupuestos/" +presupuestoId)
    return this.httpClient.get<PresupuestoDto>(this.url + versionId + "/Presupuestos/" +presupuestoId)
  }
  agregarPresupuesto(id: number, presupuesto: PresupuestoDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url + id + "/Presupuestos", presupuesto)
  }

  obtenerPresupuestos(id: number): Observable<PresupuestoDto[]> {
    return this.httpClient.get<PresupuestoDto[]>(this.url + id + "/Presupuestos")
  }
  borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + id)
  }

  actualizar(id: number | undefined, version: VersionDtoIn) {
    return this.httpClient.put(this.url + id, version)
  }

  obtenerPorId(id: number): Observable<VersionDto> {
    return this.httpClient.get<VersionDto>(this.url + id)
  }

  agregar(version: VersionDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, version)
  }

  obtenerTodos(): Observable<VersionDto[]> {
    return this.httpClient.get<VersionDto[]>(this.url)
  }

  private url = environment.apiUrl + "Versiones/"
  constructor(private httpClient: HttpClient) { }
}