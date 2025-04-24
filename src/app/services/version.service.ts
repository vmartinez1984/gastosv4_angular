import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { VersionDto, VersionDtoIn } from '../interfaces/version-dto';
import { PresupuestoDto } from '../interfaces/presupuesto-dto';

@Injectable({
  providedIn: 'root'
})
export class VersionService {
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