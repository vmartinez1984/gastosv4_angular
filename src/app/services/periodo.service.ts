import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PeriodoDto, PeriodoDtoIn } from '../interfaces/periodo-dto';
import { PresupuestoDelPeriodoDto } from '../interfaces/presupuesto-del-periodo-dto';
import {
  TransaccionDto,
  TransaccionDtoIn,
} from '../interfaces/transaccion-dto';

@Injectable({
  providedIn: 'root',
})
export class PeriodoService {
  obtenerTodasTransacciones(
    periodoId: number | undefined
  ): Observable<TransaccionDto[]> {
    return this.httpClient.get<TransaccionDto[]>(
      this.url + periodoId + '/Transacciones'
    );
  }
  obtenerPresupuestos(id: number): Observable<PresupuestoDelPeriodoDto[]> {
    return this.httpClient.get<PresupuestoDelPeriodoDto[]>(
      this.url + id + '/Presupuestos'
    );
  }

  agregarTransaccion(
    periodoId: number,
    transaccion: TransaccionDtoIn
  ): Observable<any> {
    return this.httpClient.post<any>(
      this.url + periodoId + '/Transacciones',
      transaccion
    );
  }

  borrar(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.url + id);
  }
  obtenerPorId(id: number): Observable<PeriodoDto> {
    return this.httpClient.get<PeriodoDto>(this.url + id);
  }
  agregar(periodo: PeriodoDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, periodo);
  }

  obtenerTodos(): Observable<PeriodoDto[]> {
    return this.httpClient.get<PeriodoDto[]>(this.url);
  }

  constructor(private httpClient: HttpClient) {}
  private url = environment.apiUrl + 'periodos/';
}
