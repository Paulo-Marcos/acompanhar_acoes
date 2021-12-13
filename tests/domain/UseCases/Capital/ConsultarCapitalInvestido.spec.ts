import { RepoCapitalInvestido } from '@/domain/contracts/repositories/CapitalInvestido'
import { CapitalInvestido, MovimentoCapital } from '@/domain/Models/CapitalInvestido'
import { ConsultarCapital } from '@/domain/UseCases/Capital/ConsultarCapitalInvesitdo'
import Chance from 'chance'
import { mock, MockProxy } from 'jest-mock-extended'

const chance = new Chance()

describe('Atualizar Capital Investido', () => {

  let repoCapital: MockProxy<RepoCapitalInvestido>
  const gerarValoresMovimento = (): { valorRecurso: number, dataMovimento: Date, tipoMovimento: string } => {
    const valorRecurso = chance.floating({ min: -1000000, max: 1000000 })
    const dataMovimento = chance.date()
    const tipoMovimento = valorRecurso > 0 ? 'Aporte' : 'Saque'
    return { valorRecurso, dataMovimento, tipoMovimento }
  }
  let idUsuario: number
  let quantidadeItensMovimento: number
  let contador: number = 0
  let movimentosCapital: MovimentoCapital[] = []

  beforeAll(() => {
    repoCapital = mock()
    idUsuario = chance.integer({ min: 1 })
    quantidadeItensMovimento = chance.integer({ min: 1, max: 10 })

    for (contador === 0; contador < quantidadeItensMovimento; contador++) {
      const valoresMovimento = gerarValoresMovimento()
      let movimentoCapital = {
        valorRecurso: valoresMovimento.valorRecurso,
        dataMovimento: valoresMovimento.dataMovimento,
        tipoMovimento: valoresMovimento.tipoMovimento,
        idUsuario: idUsuario
      }
      movimentosCapital.push(movimentoCapital)
    }

    repoCapital.consultar.mockResolvedValue(Promise.resolve(movimentosCapital))
  })

  afterEach(() => {
    repoCapital.atualizar.mockClear()
  })

  it('Deverá chamar consulta no repositório uma vez, com o ID do usuário', async () => {

    const sut = new ConsultarCapital(repoCapital)
    await sut.executar(idUsuario)

    expect(repoCapital.consultar).toHaveBeenCalledWith(idUsuario)
    expect(repoCapital.consultar).toHaveBeenCalledTimes(1)
  })

  it('Deverá lançar um erro se a repositório der erro', async () => {
    repoCapital.consultar.mockRejectedValueOnce(new Error('erro_consulta'))

    const sut = new ConsultarCapital(repoCapital)
    const promise = sut.executar(idUsuario)

    await expect(promise).rejects.toThrow()
  })

  it('Deverá lançar um erro do tipo não há movimento se o retorno for vazio', async () => {
    const movimentoVazio: MovimentoCapital[] = []
    repoCapital.consultar.mockResolvedValueOnce(Promise.resolve(movimentoVazio))

    const sut = new ConsultarCapital(repoCapital)
    const promise = sut.executar(idUsuario)

    await expect(promise).rejects.toThrow(new Error('Não há movimentos'))
  })

  it('Deverá gerar uma instância do CapitalInvestido', async () => {

    const sut = new ConsultarCapital(repoCapital)
    const capitalInvestido = await sut.executar(idUsuario)

    expect(capitalInvestido).toBeInstanceOf(CapitalInvestido)
    expect(capitalInvestido.movimentosCapital).toEqual(movimentosCapital)

  })
})
