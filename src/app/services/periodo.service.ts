import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PeriodoDto, PeriodoDtoIn } from '../interfaces/periodo-dto';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  obtenerPorId(id: number):Observable<PeriodoDto> {
    return this.httpClient.get<PeriodoDto>(this.url+ id)
  }
  agregar(periodo: PeriodoDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, periodo)
  }

  obtenerTodos(): Observable<PeriodoDto[]> {
    return this.httpClient.get<PeriodoDto[]>(this.url)
  }

  constructor(private httpClient: HttpClient) { }
  private url = environment.apiUrl + "periodos/"
}
