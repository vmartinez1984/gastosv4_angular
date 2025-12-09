export interface AhorroDto {
    id: number
    nombre: string
    balance: number
    tipoDeAhorroId: number
    guid: string
    nota: string
    interes: number
    fechaInicial: Date
    fechaFinal: Date
    tipoDeAhorroNombre: string
}

export interface TipoDeAhorro{
    id: number
    nombre: string
}

export interface AhorroDtoIn{
    guid: string
    nombre: string
    tipoDeAhorroId: number
    fechaInicial: Date
    fechaFinal: Date
}
