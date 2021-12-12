import { RepoAtualizarCapital } from "@/domain/contracts/repositories/CapitalInvestido"
import { MovimentoCapital } from "@/domain/Models/CapitalInvestido"


export class AtualizarCapital {
  constructor(private repoCapital: RepoAtualizarCapital) { }

  async executar(parametrosCapital: ParametrosCapital) {
    const saldoConta = await this.repoCapital.consultar(parametrosCapital.idUsuario)
    const movimentosCapital = parametrosCapital.movimentosCapital

    const saldoAtual = movimentosCapital.reduce((saldoAtual, movimento) => {
      return saldoAtual += movimento.valorRecurso
    }, saldoConta)

    if (saldoAtual < 0) {
      throw new Error('Saque maior que o saldo da conta')
    }
    await this.repoCapital.atualizar(movimentosCapital)
  }
}

export type ParametrosCapital = {
  movimentosCapital: MovimentoCapital[],
  idUsuario: number
}
