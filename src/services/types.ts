export interface relatorios {
  id?: number;
  categoria?: { nome: string };
  cliente?: string;
  cpf?: number;
  lucro?: number;
  beneiro_id: number;
  edited_by?: string;
  created_at?: string;
  created_by?: string;
  veiculo?: string;
}


export interface Benneiro {
  id: number
  cargo: string;
  nome: string;
}
