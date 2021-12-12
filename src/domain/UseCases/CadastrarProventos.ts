import { SalvarProventos } from "@/domain/contracts/repositories/Proventos"
import { Proventos } from "@/domain/Models/Proventos"

export class AdicionarProventos {

  RepoProventos: SalvarProventos

  constructor(RepoProventos: SalvarProventos) {
    this.RepoProventos = RepoProventos
  }

  async executar(proventos: Proventos[]) {
    await this.RepoProventos.salvar(proventos)
  }
}
