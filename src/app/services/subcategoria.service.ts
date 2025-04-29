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
  borrar(id: number):Observable<any> {
    return this.httpClient.delete<any>(this.url + id)
  }
  obtenerPorId(id: number): Observable<SubcategoriaDto> {
    return this.httpClient.get<SubcategoriaDto>(this.url + id)
  }
  
  obtenerTodos(): Observable<SubcategoriaDto[]> {
    return this.httpClient.get<SubcategoriaDto[]>(this.url)
  }
  
  agregar(subcategoria: SubcategoriaDtoIn): Observable<any> {
    return this.httpClient.post(this.url, subcategoria)
  }
  
  actualizar(id: number, subcategoria: SubcategoriaDtoIn): Observable<any> {
    return this.httpClient.put(this.url + id, subcategoria)
  }
  
  private url = environment.apiUrl + "subcategorias/"
  constructor(private httpClient: HttpClient) { }
}