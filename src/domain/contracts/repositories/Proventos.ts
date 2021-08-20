import { Proventos } from "@/domain/Models/Proventos"

export interface SalvarProventos {
  salvar: (entrada: SalvarProventos.Entrada) => Promise<SalvarProventos.Saida>
}

export namespace SalvarProventos {
  export type Entrada = Proventos[]
  export type Saida = undefined
}
