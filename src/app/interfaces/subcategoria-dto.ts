export interface SubcategoriaDto {
    id: number
    nombre: string
    presupuesto: number
    guid: string
    esPrimario: boolean
    categoriaId: number
}

export interface SubcategoriaDtoIn{
    nombre: string
    presupuesto: number
    guid: string
    esPrimario: boolean
    categoriaId: number
}
