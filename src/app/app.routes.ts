import { Routes } from '@angular/router';
import { ListaDeSubcategoriasComponent } from './components/subcategorias/lista-de-subcategorias/lista-de-subcategorias.component';
import { AgregarSubcategoriaComponent } from './components/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { EditarSubcategoriaComponent } from './components/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { ListaDeAhorrosComponent } from './components/ahorros/lista-de-ahorros/lista-de-ahorros.component';
import { AgregarAhorroComponent } from './components/ahorros/agregar-ahorro/agregar-ahorro.component';
import { EditarAhorroComponent } from './components/ahorros/editar-ahorro/editar-ahorro.component';
import { DetallesDelAhorroComponent } from './components/ahorros/detalles-del-ahorro/detalles-del-ahorro.component';
import { DepositoComponent } from './components/ahorros/deposito/deposito.component';
import { RetiroComponent } from './components/ahorros/retiro/retiro.component';
import { ListaDeVersionesComponent } from './components/versiones/lista-de-versiones/lista-de-versiones.component';
import { AgregarVersionComponent } from './components/versiones/agregar-version/agregar-version.component';
import { EditarVersionComponent } from './components/versiones/editar-version/editar-version.component';
import { DetallesDeVersionComponent } from './components/versiones/detalles-de-version/detalles-de-version.component';

export const routes: Routes = [
    { path: "subcategorias", component: ListaDeSubcategoriasComponent },
    { path: "subcategorias/agregar", component: AgregarSubcategoriaComponent },
    { path: "subcategorias/editar/:id", component: EditarSubcategoriaComponent },
    { path: "ahorros", component: ListaDeAhorrosComponent },
    { path: "ahorros/agregar", component: AgregarAhorroComponent },
    { path: "ahorros/editar/:id", component: EditarAhorroComponent },
    { path: "ahorros/detalles/:id", component: DetallesDelAhorroComponent },
    { path: "ahorros/:id/detalles", component: DetallesDelAhorroComponent },
    { path: "ahorros/:id/depositar", component: DepositoComponent},
    { path: "ahorros/:id/retirar", component: RetiroComponent},
    { path: "versiones", component: ListaDeVersionesComponent},
    { path: "versiones/agregar", component: AgregarVersionComponent},
    { path: "versiones/:id/editar", component: EditarVersionComponent},
    { path: "versiones/:id/detalles", component: DetallesDeVersionComponent},
];
