import { MovimentoCapital } from "@/domain/Models/CapitalInvestido"

export interface RepoAtualizarCapital {
  atualizar: (entrada: AtualizarCapital.movimentosCapital) => Promise<AtualizarCapital.undefined>
  consultar: (entrada: AtualizarCapital.idUsuario) => Promise<AtualizarCapital.saldoCapital>
}

namespace AtualizarCapital {
  export type movimentosCapital = MovimentoCapital[]
  export type undefined = undefined
  export type idUsuario = number
  export type saldoCapital = number
}
