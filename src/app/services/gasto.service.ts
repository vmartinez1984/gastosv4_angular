import { Injectable } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { HttpClient } from '@angular/common/http';
import { SubcategoriaService } from './subcategoria.service';
import { AhorroService } from './ahorro.service';
import { TipoDeAhorroService } from './tipo-de-ahorro.service';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  categoria: CategoriaService
  subcategoria: SubcategoriaService
  ahorro: AhorroService
  tipoDeAhorro: TipoDeAhorroService

  constructor(private httpClient: HttpClient) { 
   this.categoria = new CategoriaService(httpClient)
   this.subcategoria = new SubcategoriaService(httpClient)
   this.ahorro = new AhorroService(httpClient) 
   this.tipoDeAhorro = new TipoDeAhorroService(httpClient)
  }
}
