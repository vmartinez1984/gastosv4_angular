export interface PresupuestoDto {
    id: number
    //subcategoria: null,
    cantidad: number
    //versionId: number
    ahorroId: number
    subcategoriaId: number
    guid: number
    //movimientos: [],
    ahorroTipo: string
    estado: string
    totalGastado: number
    disponible: number
}
