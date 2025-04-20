import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TipoDeAhorroDto } from '../interfaces/tipo-de-ahorro-dto';

@Injectable({
  providedIn: 'root'
})
export class TipoDeAhorroService {
  private url = environment.apiUrl + "tiposDeAhorros"
  constructor(private httpClient: HttpClient) { }

  obtenerTodos(): Observable<TipoDeAhorroDto[]> {
    return this.httpClient.get<TipoDeAhorroDto[]>(this.url)
  }
}
