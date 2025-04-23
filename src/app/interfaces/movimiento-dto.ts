export interface MovimientoDto {
    guid: string
    cantidad: number
    fechaDeRegistro: Date
    concepto: string
    saldoFinal: number
    saldoInicial: number
    tipo: string
}

export interface MovimientoDtoIn{
    referencia: string
    cantidad : number    
    concepto: string   
}