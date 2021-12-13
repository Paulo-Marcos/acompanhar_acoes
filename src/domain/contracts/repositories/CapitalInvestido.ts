import { MovimentoCapital } from "@/domain/Models/CapitalInvestido"

export interface RepoCapitalInvestido {
  atualizar: (entrada: CapitalInvestido.movimentosCapital) => Promise<CapitalInvestido.undefined>
  consultar: (entrada: CapitalInvestido.idUsuario) => Promise<CapitalInvestido.saldoCapital>
}

namespace CapitalInvestido {
  export type movimentosCapital = MovimentoCapital[]
  export type undefined = undefined
  export type idUsuario = number
  export type saldoCapital = number
}
