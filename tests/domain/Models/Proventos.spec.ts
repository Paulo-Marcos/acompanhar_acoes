import { Provento, ProventosRecebidos } from "@/domain/Models/Proventos"


describe('Proventos', () => {

  const provento: Provento = {
    ativo: "ativo_qualquer",
    tipoProvento: "tipo_qualquer",
    dataPagamento: new Date(),
    quantidade: Math.random(),
    valorPago: Math.random()
  }

  const arrayProventos = [provento, provento]

  it('Deverá ser criado com os proventos informados', () => {
    const sut = new ProventosRecebidos(arrayProventos)
    const proventos = sut.getProventos()
    expect(proventos).toEqual(arrayProventos)
  })
})
