export interface PresupuestoDto {
    id: number    
    cantidad: number    
    ahorroId: number
    subcategoriaId: number
    guid: string    
    ahorroTipo: string
    estado: string
    totalGastado: number
    disponible: number
    versionId: number
}

export interface PresupuestoDtoIn{
    guid: string
    cantidad: number    
    ahorroId?: number
    subcategoriaId: number
    versionId: number
}