export interface VersionDto {
    id: number
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
    guid: string
}

export interface VersionDtoIn{
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
}