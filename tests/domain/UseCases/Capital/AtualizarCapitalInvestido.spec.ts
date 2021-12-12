import { RepoAtualizarCapital } from '@/domain/contracts/repositories/CapitalInvestido'
import { MovimentoCapital } from '@/domain/Models/CapitalInvestido'
import { AtualizarCapital } from '@/domain/UseCases/Capital/AtualizarCapitalInvestido'
import Chance from 'chance'
import { mock, MockProxy } from 'jest-mock-extended'

const chance = new Chance()

describe('Atualizar Capital Investido', () => {

  let repoCapital: MockProxy<RepoAtualizarCapital>
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
  let saldoGerado: number = 0

  beforeAll(() => {
    repoCapital = mock()
    idUsuario = chance.integer({ min: 1 })
    quantidadeItensMovimento = chance.integer({ min: 1, max: 10 })

    for (contador === 0; contador < quantidadeItensMovimento; contador++) {
      const valoresMovimento = gerarValoresMovimento()
      saldoGerado += Math.abs(valoresMovimento.valorRecurso)
      let movimentoCapital = {
        valorRecurso: valoresMovimento.valorRecurso,
        dataMovimento: valoresMovimento.dataMovimento,
        tipoMovimento: valoresMovimento.tipoMovimento,
        idUsuario: idUsuario
      }
      movimentosCapital.push(movimentoCapital)
    }

    repoCapital.consultar.mockResolvedValue(Promise.resolve(saldoGerado))
  })

  afterEach(() => {
    repoCapital.atualizar.mockClear()
  })

  it('Deverá atualizar o capital investido', async () => {

    const parametrosCapital = { movimentosCapital, idUsuario }
    const sut = new AtualizarCapital(repoCapital)
    await sut.executar(parametrosCapital)

    expect(repoCapital.atualizar).toHaveBeenCalledWith(movimentosCapital)
    expect(repoCapital.atualizar).toHaveBeenCalledTimes(1)
  })

  it('Deverá sacar no máximo o valor investido.', async () => {
    repoCapital.consultar.mockResolvedValue(Promise.resolve(0))

    const valoresMovimento = gerarValoresMovimento()
    const movimentoCapital = {
      valorRecurso: -saldoGerado + 1,
      dataMovimento: valoresMovimento.dataMovimento,
      tipoMovimento: 'Saque',
      idUsuario: idUsuario
    }

    movimentosCapital.push(movimentoCapital)

    const parametrosCapital = { movimentosCapital, idUsuario }
    const sut = new AtualizarCapital(repoCapital)
    const promise = sut.executar(parametrosCapital)

    await expect(promise).rejects.toThrow(new Error('Saque maior que o saldo da conta'))
  })
})
