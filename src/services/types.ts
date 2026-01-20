export interface relatorios {
  id?: number;
  categoria?: string;
  cliente?: string;
  cpf?: number;
  lucro?: number;
  beneiro_id: number;
  edited_by?: string;
  created_at?: string;
  created_by?: string;
  veiculo?: string;
  escape?: string;
  leilao?: Boolean;
  xenom?: boolean;
  kit_nitro?: string;
  nitro?: number;
  motivo?: string;
  relatorio_id?: number;
}

export interface Benneiro {
  id: number;
  cargo: string;
  nome: string;
}
