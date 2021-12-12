import { RepoConsultarProventos } from "@/domain/contracts/repositories/Proventos"
import { Provento } from "@/domain/Models/Proventos"
import { ConsultarProventos } from "@/domain/UseCases/Proventos/ConsultarProventos"
import { mock, MockProxy } from 'jest-mock-extended'


describe('Cadastrar Proventos', () => {

  let RepoProventos: MockProxy<RepoConsultarProventos>
  let proventos: Provento
  let arrayProventos: Provento[]

  beforeAll(() => {
    proventos = {
      ativo: "ativo_qualquer",
      tipoProvento: "tipo_qualquer",
      dataPagamento: new Date(),
      quantidade: Math.random(),
      valorPago: Math.random()
    }
    arrayProventos = [proventos, proventos]
    RepoProventos = mock()
    RepoProventos.consultar.mockResolvedValue(Promise.resolve(arrayProventos))
  })

  afterEach(() => {
    RepoProventos.consultar.mockClear()
    // RepoProventos.consultar.mockResolvedValue(Promise.resolve(arrayProventos))
  })

  it('Deverá retornar os proventos de um determinado usuário', async () => {
    const idUsuario = Math.random() * 1000
    const sut = new ConsultarProventos(RepoProventos)
    const proventos = await sut.executar(idUsuario)

    expect(RepoProventos.consultar).toHaveBeenCalledWith(idUsuario)
    expect(RepoProventos.consultar).toHaveBeenCalledTimes(1)
    expect(proventos).toEqual(arrayProventos)
  })

  it('Deverá retornar vazio quando não houver provento', async () => {
    const idUsuario = Math.random() * 1000
    const sut = new ConsultarProventos(RepoProventos)
    const proventosVazio: Provento[] = []
    RepoProventos.consultar.mockResolvedValue(Promise.resolve(proventosVazio))
    const proventos = await sut.executar(idUsuario)

    expect(RepoProventos.consultar).toHaveBeenCalledWith(idUsuario)
    expect(RepoProventos.consultar).toHaveBeenCalledTimes(1)
    expect(proventos).toHaveLength(0)
  })
})
