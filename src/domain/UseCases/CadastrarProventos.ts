import { SalvarProventos } from "@/domain/contracts/repositories/Proventos"
import { Provento } from "@/domain/Models/Proventos"

export class AdicionarProventos {

  RepoProventos: SalvarProventos

  constructor(RepoProventos: SalvarProventos) {
    this.RepoProventos = RepoProventos
  }

  async executar(proventos: Provento[]) {
    await this.RepoProventos.salvar(proventos)
  }
}
