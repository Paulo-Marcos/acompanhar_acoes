import { SalvarProventos } from "@/domain/contracts/repositories/Proventos"
import { Provento } from "@/domain/Models/Proventos"
import { AdicionarProventos } from "@/domain/UseCases/CadastrarProventos"
import { mock, MockProxy } from 'jest-mock-extended'

describe('Cadastrar Proventos', () => {

  let RepoProventos: MockProxy<SalvarProventos>
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
  })

  it('Deverá chamar o método salvar com a entrada correta', async () => {
    const sut = new AdicionarProventos(RepoProventos)
    await sut.executar(arrayProventos)
    expect(RepoProventos.salvar).toHaveBeenCalledWith(arrayProventos)
    expect(RepoProventos.salvar).toHaveBeenCalledTimes(1)
  })

  it('Deverá relançar error se repositório lançar error', async () => {
    RepoProventos.salvar.mockRejectedValueOnce(new Error('erro_salvar'))

    const sut = new AdicionarProventos(RepoProventos)
    const promise = sut.executar(arrayProventos)
    await expect(promise).rejects.toThrow(new Error('erro_salvar'))
  })
})
