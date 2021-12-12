export type Provento = {
  ativo: string,
  tipoProvento: string,
  dataPagamento: Date,
  quantidade: number,
  valorPago: number
}

export class ProventosRecebidos {

  private proventos: Provento[];

  constructor(readonly provento: Provento[]) {
    this.proventos = provento
    this.getProventos()
  }

  getProventos(): Provento[] {
    return this.proventos
  }

}
