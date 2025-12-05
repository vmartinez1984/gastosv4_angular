export interface CompraDto {
  id: number;
  encodedkey: string;
  nombre: string;
  nota: string;
  mesesSinIntereses: number;
  monto: number;
  saldo: number;
  fechaDeCompra: Date;
  fechaDeRegsitro: Date;
}
