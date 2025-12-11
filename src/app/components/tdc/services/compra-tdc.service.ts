import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CompraDtoIn, ListaDeCompras } from '../interfaces/compra-dto';
import { IdDto } from '../../../interfaces/id-dto';

@Injectable({
  providedIn: 'root',
})
export class CompraTdcService {
  obtenerComprasTdc(): Observable<ListaDeCompras[]> {
    return this.httpClient.get<ListaDeCompras[]>(this.url);
  }

  agregarCompraTdc(compra: CompraDtoIn): Observable<IdDto> {
    return this.httpClient.post<IdDto>(this.url, compra);
  }

  private url = environment.apiUrl + 'TarjetaDeCredito/Compras/';
  //       https://localhost:7275/api/TarejetaDeCredito/Compras
  constructor(private httpClient: HttpClient) {}
}
