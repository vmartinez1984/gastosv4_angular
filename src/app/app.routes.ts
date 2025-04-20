import { Routes } from '@angular/router';
import { ListaDeSubcategoriasComponent } from './components/subcategorias/lista-de-subcategorias/lista-de-subcategorias.component';
import { AgregarSubcategoriaComponent } from './components/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { EditarSubcategoriaComponent } from './components/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { ListaDeAhorrosComponent } from './components/ahorros/lista-de-ahorros/lista-de-ahorros.component';
import { AgregarAhorroComponent } from './components/ahorros/agregar-ahorro/agregar-ahorro.component';

export const routes: Routes = [
    { path: "subcategorias", component: ListaDeSubcategoriasComponent },
    { path: "subcategorias/agregar", component: AgregarSubcategoriaComponent },
    { path: "subcategorias/editar/:id", component: EditarSubcategoriaComponent },
    { path: "ahorros", component:ListaDeAhorrosComponent},
    { path: "ahorros/agregar", component: AgregarAhorroComponent}
];
