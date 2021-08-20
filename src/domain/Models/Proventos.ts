export type Proventos = {
  ativo: string,
  tipoProvento: string,
  dataPagamento: Date,
  quantidade: number,
  valorPago: number
}

export class ProventosPagos {

  proventos: Proventos[]

  constructor(proventos: Proventos[]) {
    this.proventos = proventos
  }
}
