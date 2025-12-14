import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PagoDtoIn } from '../interfaces/pago-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagoTdcService {

  realizarPago(pago:PagoDtoIn):Observable<any>{
    return this.httpClient.post<any>(this.url, pago);
  }

  private url = environment.apiUrl + 'TarjetaDeCredito/Pagos/';

  constructor(private httpClient: HttpClient) {}
}
