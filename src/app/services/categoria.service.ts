import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CategoriaDto } from '../interfaces/categoria-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = environment.apiUrl + "Categorias"
  constructor(private httpClient: HttpClient) { }

  obtenerTodos(): Observable<CategoriaDto[]> {
    //console.log(this.url)
    return this.httpClient.get<CategoriaDto[]>(this.url)
  }

}
