export type PropertyVistaList = {
  Codigo: string;
  TituloSite: string;
  Dormitorios: string;
  UF: string;
  ValorVenda?: string;
  ValorLocacao?: string;
  ValorTotalAluguel?: string;
  Status: string;
  AreaPrivativa: string;
  AreaTotal: string;
  FotoDestaque: string;
  Bairro: string;
  Cidade: string;
  Categoria: string;
}

export type PropertyVistaFoto = {
  Codigo: string;
  Foto: string;
  Destaque: string;
}