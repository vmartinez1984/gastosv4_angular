import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CompraDto } from '../interfaces/compra-dto';

@Injectable({
  providedIn: 'root',
})
export class CompraTdcService {
  obtenerComprasTdc(): Observable<CompraDto[]> {
    return this.httpClient.get<CompraDto[]>(this.url);
  }

  private url = environment.apiUrl + 'TarjetaDeCredito/Compras/';
  //       https://localhost:7275/api/TarejetaDeCredito/Compras
  constructor(private httpClient: HttpClient) {}
}
