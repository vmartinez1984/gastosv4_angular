import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SubcategoriaDto, SubcategoriaDtoIn } from '../interfaces/subcategoria-dto';
import { CategoriaDto } from '../interfaces/categoria-dto';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {
  obtenerPorId(id: number): Observable<SubcategoriaDto> {
    return this.httpClient.get<SubcategoriaDto>(this.url + id)
  }
  private url = environment.apiUrl + "subcategorias/"
  constructor(private httpClient: HttpClient) { }

  obtenerTodos(): Observable<SubcategoriaDto[]> {
    return this.httpClient.get<SubcategoriaDto[]>(this.url)
  }

  agregar(subcategoria: SubcategoriaDtoIn): Observable<any> {
    return this.httpClient.post(this.url, subcategoria)
  }

  actualizar(id: number, subcategoria: SubcategoriaDtoIn): Observable<any> {
    return this.httpClient.put(this.url + id, subcategoria)
  }
  
}