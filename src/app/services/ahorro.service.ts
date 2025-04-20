import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AhorroDto, AhorroDtoIn } from '../interfaces/ahorro-dto';

@Injectable({
  providedIn: 'root'
})
export class AhorroService {
  obtenerTodos(): Observable<AhorroDto[]> {
    return this.httpClient.get<AhorroDto[]>(this.url)
  }

  agregar(ahorro: AhorroDtoIn): Observable<any> {
    return this.httpClient.post<any>(this.url, ahorro)
  }

  private url = environment.apiUrl + "Ahorros"
  constructor(private httpClient: HttpClient) { }
}
