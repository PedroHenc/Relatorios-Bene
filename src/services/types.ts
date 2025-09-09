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
  leilao?: Boolean;
}

export interface Benneiro {
  id: number
  cargo: string;
  nome: string;
}