import { Provento } from "@/domain/Models/Proventos"

export interface RepoSalvarProventos {
  salvar: (entrada: SalvarProventos.Entrada) => Promise<SalvarProventos.Saida>
}

export interface RepoConsultarProventos {
  consultar: (entrada: ConsultarProventos.Entrada) => Promise<ConsultarProventos.Saida>
}

export namespace SalvarProventos {
  export type Entrada = Provento[]
  export type Saida = undefined
}

export namespace ConsultarProventos {
  export type Entrada = number
  export type Saida = Provento[]
}
