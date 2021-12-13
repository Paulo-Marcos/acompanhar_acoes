export type MovimentoCapital = {
  valorRecurso: number,
  dataMovimento: Date,
  tipoMovimento: string,
  idUsuario: number
}

export class CapitalInvestido {

  private saldoCapitalInvestido: number = 0

  constructor(readonly movimentosCapital: MovimentoCapital[]) {
    this.definirSaldoCapitalInvestido()
  }

  definirSaldoCapitalInvestido(): void {
    this.movimentosCapital.forEach(movimento => {
      this.saldoCapitalInvestido += movimento.valorRecurso
    });
  }

  gerarSaldoCapitalInvestido() {
    return this.saldoCapitalInvestido
  }
}
