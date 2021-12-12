import Chance from 'chance'
import { mock, MockProxy } from 'jest-mock-extended'

export interface RepoAtualizarCapital {
  atualizar: (entrada: AtualizarCapital.Entrada) => Promise<AtualizarCapital.Saida>
}

namespace AtualizarCapital {
  export type Entrada = movimentoCapital[]
  export type Saida = undefined
}

class AtualizarCapital {
  constructor(private repoCapital: RepoAtualizarCapital) { }

  async executar(movimentoCapital: movimentoCapital[]) {
    await this.repoCapital.atualizar(movimentoCapital)
  }
}

export type movimentoCapital = {
  valorRecurso: number,
  dataMovimento: Date,
  tipoMovimento: string,
  idUsuario: number
}

describe('Atualizar Capital Investido', () => {

  let repoCapital: MockProxy<RepoAtualizarCapital>
  // let proventos: Provento
  // let arrayProventos: Provento[]

  beforeAll(() => {
    // proventos = {
    //   ativo: "ativo_qualquer",
    //   tipoProvento: "tipo_qualquer",
    //   dataPagamento: new Date(),
    //   quantidade: Math.random(),
    //   valorPago: Math.random()
    // }
    // arrayProventos = [proventos, proventos]
    repoCapital = mock()
    // repoCapital.atualizar.mockResolvedValue(Promise.resolve(arrayProventos))
  })

  afterEach(() => {
    repoCapital.atualizar.mockClear()
  })

  it('Deverá atualizar o capital investido', async () => {
    const chance = new Chance()
    const valorRecurso = chance.floating({ min: -1000000, max: 1000000 })
    const movimentoCapital = {
      valorRecurso: valorRecurso,
      dataMovimento: chance.date(),
      tipoMovimento: valorRecurso > 0 ? 'Aporte' : 'Saque',
      idUsuario: chance.integer({ min: 1 })
    }
    const arrayMovimentoCapital = [movimentoCapital, movimentoCapital]
    const sut = new AtualizarCapital(repoCapital)
    await sut.executar(arrayMovimentoCapital)

    expect(repoCapital.atualizar).toHaveBeenCalledWith(arrayMovimentoCapital)
    expect(repoCapital.atualizar).toHaveBeenCalledTimes(1)
  })

  // it('Deverá retornar vazio quando não houver provento', async () => {
  //   const idUsuario = Math.random() * 1000
  //   const sut = new ConsultarProventos(RepoProventos)
  //   const proventosVazio: Provento[] = []
  //   RepoProventos.consultar.mockResolvedValue(Promise.resolve(proventosVazio))
  //   const proventos = await sut.executar(idUsuario)

  //   expect(RepoProventos.consultar).toHaveBeenCalledWith(idUsuario)
  //   expect(RepoProventos.consultar).toHaveBeenCalledTimes(1)
  //   expect(proventos).toHaveLength(0)
  // })
})
