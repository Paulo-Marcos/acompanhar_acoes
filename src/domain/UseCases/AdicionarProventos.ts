import { RepoSalvarProventos } from "@/domain/contracts/repositories/Proventos"
import { Provento } from "@/domain/Models/Proventos"

export class AdicionarProventos {

  RepoProventos: RepoSalvarProventos

  constructor(RepoProventos: RepoSalvarProventos) {
    this.RepoProventos = RepoProventos
  }

  async executar(proventos: Provento[]) {
    await this.RepoProventos.salvar(proventos)
  }
}
