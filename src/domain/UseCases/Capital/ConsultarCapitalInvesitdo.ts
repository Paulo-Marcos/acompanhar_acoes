import { RepoCapitalInvestido } from "@/domain/contracts/repositories/CapitalInvestido"
import { CapitalInvestido } from "@/domain/Models/CapitalInvestido"

export class ConsultarCapital {
  constructor(private repoCapital: RepoCapitalInvestido) { }

  async executar(idUsuario: number) {
    const movimentosCapital = await this.repoCapital.consultar(idUsuario)
    if (movimentosCapital.length === 0) {
      throw new Error('Não há movimentos')
    }
    const capitalInvestido = new CapitalInvestido(movimentosCapital)
    return capitalInvestido
  }
}
