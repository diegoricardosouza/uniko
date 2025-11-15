type CaracteristicasProps = Record<string, "Sim" | "Nao" | string>;

export type PropertyVistaFoto = {
  Codigo: string;
  Foto: string;
  Destaque: string;
}

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
  Endereco: string;
  Numero: string;
  Complemento: string;
  Categoria: string;
  Vagas: string;
  TotalBanheiros: string;
  DataEntrega: string;
  DescricaoEmpreendimento: string;
  DescricaoWeb: string;
  ValorIptu: string;
  ValorCondominio: string;
  Caracteristicas: CaracteristicasProps;
  InfraEstrutura: CaracteristicasProps;
  Foto?: PropertyVistaFoto[];
}

