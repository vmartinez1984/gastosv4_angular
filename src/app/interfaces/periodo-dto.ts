export interface PeriodoDto {
    id: number
    guid: string
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
    versionId: number
}

export interface PeriodoDtoIn{    
    guid: string
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
    versionId: number
}