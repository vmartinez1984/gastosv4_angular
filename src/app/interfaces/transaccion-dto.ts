export interface TransaccionDtoIn {
    encodedKey: string
    presupuestoId: number
    cantidad: number
}

export interface TransaccionDto {
  id: number
  encodedKey: string;
  presupuestoId: number;
  cantidad: number;
}
