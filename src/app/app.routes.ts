import { Routes } from '@angular/router';
import { ListaDeSubcategoriasComponent } from './components/subcategorias/lista-de-subcategorias/lista-de-subcategorias.component';
import { AgregarSubcategoriaComponent } from './components/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { EditarSubcategoriaComponent } from './components/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { ListaDeAhorrosComponent } from './components/ahorros/lista-de-ahorros/lista-de-ahorros.component'
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
import { ListaDeComprasComponent } from './components/tdc/compras/lista-de-compras/lista-de-compras.component';

export const routes: Routes = [
    { path: "", component: InicioComponent, canActivate: [SesionGuard] },
    { path: "inicioDeSesion", component: InicioDeSesionComponent },
    { path: "subcategorias", component: ListaDeSubcategoriasComponent, canActivate: [SesionGuard] },
    { path: "subcategorias/agregar", component: AgregarSubcategoriaComponent, canActivate: [SesionGuard] },
    { path: "subcategorias/editar/:id", component: EditarSubcategoriaComponent, canActivate: [SesionGuard] },
    { path: "ahorros", component: ListaDeAhorrosComponent, canActivate: [SesionGuard] },
    { path: "ahorros/detalles/:id", component: DetallesDelAhorroComponent, canActivate: [SesionGuard] },
    { path: "ahorros/:id/detalles", component: DetallesDelAhorroComponent, canActivate: [SesionGuard] },
    { path: "ahorros/:id/depositar", component: DepositoComponent, canActivate: [SesionGuard] },
    { path: "ahorros/:id/retirar", component: RetiroComponent, canActivate: [SesionGuard] },
    { path: "versiones", component: ListaDeVersionesComponent, canActivate: [SesionGuard] },
    { path: "versiones/agregar", component: AgregarVersionComponent, canActivate: [SesionGuard] },
    { path: "versiones/:id/editar", component: EditarVersionComponent, canActivate: [SesionGuard] },
    { path: "versiones/:id/detalles", component: DetallesDeVersionComponent, canActivate: [SesionGuard] },
    { path: "versiones/:id/presupuestos/agregar", component: AgregarPresupuestoComponent, canActivate: [SesionGuard] },
    { path: "versiones/:id/presupuestos/:presupuestoId/editar", component: EditarPresupuestoComponent, canActivate: [SesionGuard] },
    { path: "periodos", component: ListaDePeriodosComponent, canActivate: [SesionGuard] },
    { path: "periodos/agregar", component: AgregarPeriodoComponent, canActivate: [SesionGuard] },
    { path: "periodos/:id/editar", component: EditarPeriodoComponent,canActivate: [SesionGuard] },
    { path: "periodos/:id/detalles", component: DetalleDePeriodoComponent, canActivate: [SesionGuard] },
    { path: "tdc", component: ListaDeComprasComponent}
];
