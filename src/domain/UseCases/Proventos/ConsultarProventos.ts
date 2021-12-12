import { RepoConsultarProventos } from "@/domain/contracts/repositories/Proventos"

export class ConsultarProventos {
  constructor(private RepoProventos: RepoConsultarProventos) { }

  async executar(idUsuario: number) {
    const proventos = await this.RepoProventos.consultar(idUsuario)
    return proventos
  }
}
