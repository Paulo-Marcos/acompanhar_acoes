import { ProventosPagos } from "@/domain/Models/Proventos"


describe('Proventos', () => {

  const proventos = {
    ativo: "ativo_qualquer",
    tipoProvento: "tipo_qualquer",
    dataPagamento: new Date(),
    quantidade: Math.random(),
    valorPago: Math.random()
  }

  const arrayProventos = [proventos, proventos]

  it('Deverá ser criado com os proventos informados', () => {
    const sut = new ProventosPagos(arrayProventos)
    expect(sut.proventos).toEqual(arrayProventos)
  })
})
