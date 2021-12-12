import { Provento } from "@/domain/Models/Proventos"

export interface SalvarProventos {
  salvar: (entrada: SalvarProventos.Entrada) => Promise<SalvarProventos.Saida>
}

export namespace SalvarProventos {
  export type Entrada = Provento[]
  export type Saida = undefined
}
