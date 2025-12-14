export interface TransaccionDtoIn {
    encodedKey: string
    presupuestoId: number
    cantidad: number
    nota?: string
}

export interface TransaccionDto {
  id: number
  encodedKey: string;
  presupuestoId: number;
  cantidad: number;
}
