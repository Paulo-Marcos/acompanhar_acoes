import { RepoCapitalInvestido } from "@/domain/contracts/repositories/CapitalInvestido"
import { CapitalInvestido, MovimentoCapital } from "@/domain/Models/CapitalInvestido"


export class AtualizarCapital {
  constructor(private repoCapital: RepoCapitalInvestido) { }

  async executar(parametrosCapital: ParametrosCapital) {
    const movimentosCapital = await this.repoCapital.consultar(parametrosCapital.idUsuario)
    const capitalInvestido = new CapitalInvestido(movimentosCapital)
    const novosMovimentosCapital = parametrosCapital.movimentosCapital

    const saldoAtual = novosMovimentosCapital.reduce((saldoAtual, movimento) => {
      return saldoAtual += movimento.valorRecurso
    }, capitalInvestido.gerarSaldoCapitalInvestido())

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
