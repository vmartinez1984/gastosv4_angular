export interface CompraDto {
  id: number;
  encodedkey: string;
  nombre: string;
  nota: string;
  mesesSinIntereses: number;
  monto: number;
  saldo: number;
  fechaDeCompra: Date | undefined;
  fechaDeRegistro: Date;
}

export interface CompraDtoIn {
  encodedkey: string;
  nombre: string;
  nota: string;
  mesesSinIntereses: number;
  monto: number;
  fechaDeCompra: string;
}

export interface ListaDeCompras {
  mes: number;
  anio: number;
  fechaDePago: Date;
  compras: CompraDto[];
  total: number;
}
