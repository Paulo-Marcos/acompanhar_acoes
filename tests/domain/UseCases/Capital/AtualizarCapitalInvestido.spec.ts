import Chance from 'chance'
import { mock, MockProxy } from 'jest-mock-extended'

const chance = new Chance()

export interface RepoAtualizarCapital {
  atualizar: (entrada: AtualizarCapital.movimentosCapital) => Promise<AtualizarCapital.undefined>
  consultar: (entrada: AtualizarCapital.idUsuario) => Promise<AtualizarCapital.saldoCapital>
}

namespace AtualizarCapital {
  export type movimentosCapital = MovimentoCapital[]
  export type undefined = undefined
  export type idUsuario = number
  export type saldoCapital = number
}

class AtualizarCapital {
  constructor(private repoCapital: RepoAtualizarCapital) { }

  async executar(parametrosCapital: ParametrosCapital) {
    const saldoConta = await this.repoCapital.consultar(parametrosCapital.idUsuario)
    const movimentosCapital = parametrosCapital.movimentosCapital

    const saldoAtual = movimentosCapital.reduce((saldoAtual, movimento) => {
      return saldoAtual += movimento.valorRecurso
    }, saldoConta)

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

export type MovimentoCapital = {
  valorRecurso: number,
  dataMovimento: Date,
  tipoMovimento: string,
  idUsuario: number
}

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
