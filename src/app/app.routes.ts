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
import { AgregarPresupuestoComponent } from './components/versiones/presupuestos/agregar-presupuesto/agregar-presupuesto.component';
import { EditarPresupuestoComponent } from './components/versiones/presupuestos/editar-presupuesto/editar-presupuesto.component';
import { ListaDePeriodosComponent } from './components/periodos/lista-de-periodos/lista-de-periodos.component';
import { AgregarPeriodoComponent } from './components/periodos/agregar-periodo/agregar-periodo.component';
import { EditarPeriodoComponent } from './components/periodos/editar-periodo/editar-periodo.component';
import { DetalleDePeriodoComponent } from './components/periodos/detalle-de-periodo/detalle-de-periodo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { InicioDeSesionComponent } from './modules/inicio-de-sesion/inicio-de-sesion-component/inicio-de-sesion.component';
import { SesionGuard } from './modules/inicio-de-sesion/services/sesion-guard';

export const routes: Routes = [
    { path: "", component: InicioComponent, canActivate: [SesionGuard] },
    { path: "inicioDeSesion", component: InicioDeSesionComponent },
    { path: "subcategorias", component: ListaDeSubcategoriasComponent, canActivate: [SesionGuard] },
    { path: "subcategorias/agregar", component: AgregarSubcategoriaComponent },
    { path: "subcategorias/editar/:id", component: EditarSubcategoriaComponent },
    { path: "ahorros", component: ListaDeAhorrosComponent, canActivate: [SesionGuard] },
    { path: "ahorros/agregar", component: AgregarAhorroComponent },
    { path: "ahorros/editar/:id", component: EditarAhorroComponent },
    { path: "ahorros/detalles/:id", component: DetallesDelAhorroComponent },
    { path: "ahorros/:id/detalles", component: DetallesDelAhorroComponent },
    { path: "ahorros/:id/depositar", component: DepositoComponent },
    { path: "ahorros/:id/retirar", component: RetiroComponent },
    { path: "versiones", component: ListaDeVersionesComponent, canActivate: [SesionGuard] },
    { path: "versiones/agregar", component: AgregarVersionComponent },
    { path: "versiones/:id/editar", component: EditarVersionComponent },
    { path: "versiones/:id/detalles", component: DetallesDeVersionComponent },
    { path: "versiones/:id/presupuestos/agregar", component: AgregarPresupuestoComponent },
    { path: "versiones/:id/presupuestos/:presupuestoId/editar", component: EditarPresupuestoComponent },
    { path: "periodos", component: ListaDePeriodosComponent, canActivate: [SesionGuard] },
    { path: "periodos/agregar", component: AgregarPeriodoComponent },
    { path: "periodos/:id/editar", component: EditarPeriodoComponent },
    { path: "periodos/:id/detalles", component: DetalleDePeriodoComponent },
];
