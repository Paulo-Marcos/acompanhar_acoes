export type MovimentoCapital = {
  valorRecurso: number,
  dataMovimento: Date,
  tipoMovimento: string,
  idUsuario: number
}

export class CapitalInvestido {

  private capitalInvestidoAtual: number = 0

  constructor(readonly movimentosCapital: MovimentoCapital[]) {
    this.definirCapitalInvestidoAtual()
  }

  definirCapitalInvestidoAtual(): void {
    this.movimentosCapital.forEach(movimento => {
      this.capitalInvestidoAtual += movimento.valorRecurso
    });
  }
}
