import { Component, Inject, OnDestroy, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators , ReactiveFormsModule} from '@angular/forms';


import { ConsorcioService } from '../../services/consorcio';
import { Consorcio } from '../../models/consorcio.model';
import { SimulacaoService } from '../../services/simulacao';
import { ResultadoCalculo } from '../../models/resultado-calculo.model';


/**
 * Componente de página que exibe detalhes de um consórcio.
 *
 * Responsabilidade:
 * - Ler o parâmetro de rota `id` (ex: `/consorcios/3`) usando `ActivatedRoute`.
 * - Armazenar o id em `consorcioId` (number | null) para uso pelo template.
 *
 * Observações de implementação:
 * - O componente é `standalone: true` e importa `CommonModule` — seguir o mesmo
 *   padrão ao criar novos componentes standalone neste projeto.
 * - Atualmente os dados do consórcio são simulados em outras páginas. Este
 *   componente apenas captura o `id` da rota; a lógica de carregamento do
 *   consórcio pode ser adicionada posteriormente (ex.: via um serviço em
 *   `src/app/services`).
 */
@Component({
  selector: 'app-detalhe-consorcio',
  imports: [CommonModule,  ReactiveFormsModule, RouterModule, RouterLink],
  standalone: true,
  templateUrl: './detalhe-consorcio.html',
  styleUrls: ['./detalhe-consorcio.css']
})

export class DetalheConsorcio implements OnInit, OnDestroy {

  isSending: boolean = false;

  valoresCalculados: ResultadoCalculo | undefined;

  /**
   * Dados do consórcio carregados do serviço.
   * - `undefined` indica que o consórcio não foi encontrado.
   */
  consorcioDetalhe: Consorcio | undefined;

  /**
   * Flag usada pelo template para mostrar estado de carregamento.
   */
  isLoading: boolean = true

  formSimulacao!: FormGroup

  /**
   * Injeções:
   * - `route`: fornece acesso aos parâmetros da rota atual (`paramMap`).
   * - `consorcioService`: serviço responsável por buscar dados de consórcios.
   */
  constructor (
    
    @Inject(ActivatedRoute) private route: ActivatedRoute,


    private consorcioService: ConsorcioService,
    private simulacaoService: SimulacaoService

  ) {}
 

  // Lista de opcoes de parcelamento
  opcoesParcelas: number[] = [80, 72, 60, 48, 36, 24, 12];

  // Novos valores de parcelas simulados
  valorParcelaComSeguro: number | undefined
  valorParcelaSemSeguro: number | undefined

  // Para gerenciar a inscrição do observable no formulario
  private parcelaSubscription !: Subscription;

  /**
   * Inicializa o componente e observa mudanças nos parâmetros de rota.
   *
   * Comportamento:
   * - Para cada mudança em `paramMap` tenta obter o parâmetro `id`.
   * - Se `id` existir, converte para número e chama
   *   `consorcioService.getConsorcioById(id)`.
   * - Se `id` não existir, retorna um `Observable` com `undefined` via `of`.
   * - O `switchMap` garante que apenas a chamada mais recente do serviço seja
   *   considerada (cancelando chamadas anteriores em andamento).
   * - O resultado é consumido por `subscribe`, que atualiza `consorcioDetalhe`
   *   e `isLoading`.
   *
   * Observação: a assinatura feita por `subscribe` não é explicitamente
   * cancelada aqui; em componentes mais complexos considere `takeUntil` ou
   * expor `consorcio$` e usar o `async` pipe no template.
   */
  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const idParam = params.get('id');
        if (idParam) {
          const id = +idParam;
          return this.consorcioService.getConsorcioById(id);
        }
        // garante que sempre retornamos um Observable, evitando `undefined`
        return of(undefined);
      })
    ).subscribe(consorcio => {
      this.consorcioDetalhe = consorcio;
      this.isLoading = false;
      if (consorcio) {
        // opcional: tratar caso "not found" (ex: navegar de volta ou mostrar mensagem)
        this.inicializarFormulario()
      }
    });
  }

  private inicializarFormulario():void {
    this.formSimulacao = new FormGroup({
      nome: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      valorDesejado: new FormControl(this.consorcioDetalhe?.valorTotal, [
        Validators.required,
        Validators.min(1000)
      ]),
      aceiteContrato: new FormControl(false,[]),
      numeroParcelas: new FormControl(this.opcoesParcelas[0], [
        Validators.required
      ]),
    });
    // Chamada Principal: Ligar a mudança de parcelas ao calculo dos valores
    this.monitorarMudancaDeParcelas()
  }

// Monitora a mudança no campo 'numeroParcelas'
  monitorarMudancaDeParcelas(): void {
    const parcelasControl = this.formSimulacao.get('numeroParcelas');

    if (parcelasControl) {
      // 1. Usamos .valueChanges para reagir a cada mudança de valor
      this.parcelaSubscription = parcelasControl.valueChanges.subscribe(numParcelas => {
        // Chamamos o cálculo sempre que o valor mudar
        this.calcularValoresParcela(numParcelas);
      });
      
      // 2. ADIÇÃO CHAVE: Disparar o cálculo inicial usando o valor atual do controle
      this.calcularValoresParcela(parcelasControl.value); 
      // O cálculo é feito com o valor '80' assim que o formulário está pronto,
      // garantindo que 'valoresCalculados' não seja undefined no início.
    }
}

  // Novo método: Lógica de cálculo dos valores das parcelas
  calcularValoresParcela(numeroParcelas: number): void {
    
    if (!this.consorcioDetalhe) return;
    const valorTotal = this.consorcioDetalhe.valorTotal;

    // Simulacao de calculo : (valorTotal / numeroParcelas)
    // Em um app real, o calculo incluiria taxa de administracao, seguro, fundo de reserva, etc.
    let parcelaBase = valorTotal / numeroParcelas;

    // Adicionando taxa de seguro/serviço simulada
    // Ex: 2.5% do valor da parcela base
   const taxaSeguroSimulada = 0.025;

    // Ajustar os valores para refletir a simulação
    this.valorParcelaComSeguro = parcelaBase * (1 + taxaSeguroSimulada);
    this.valorParcelaSemSeguro = parcelaBase;

    console.log(this.valorParcelaComSeguro, this.valorParcelaSemSeguro);

  }
  // Garante que o Observable seja fechado quando o componente for destruído (boa prática)
  ngOnDestroy(): void {
    if (this.parcelaSubscription) {
      this.parcelaSubscription.unsubscribe();
    }
  }

 enviarSimulacao(): void {

    console.log('Enviar Simulação acionado');
    if (this.formSimulacao.valid) {

       // 2. Garanta que os valores calculados existam
        if (this.valorParcelaComSeguro === undefined || this.valorParcelaSemSeguro === undefined) {
             console.error("Erro interno: Valores de parcela não calculados.");
             alert("Aguarde o cálculo das parcelas ser concluído.");
             return; // Sai da função
        }

     const dadosBase = this.formSimulacao.value; 

        // 3. Monta o objeto com as variáveis primitivas que estão definidas
        const dadosSimulacao = {
            ...dadosBase, 
            valorParcelaComSeguro: this.valorParcelaComSeguro, 
            valorParcelaSemSeguro: this.valorParcelaSemSeguro
        };

        console.log("Objeto FINAL ENVIADO:", dadosSimulacao); // AGORA ISSO VAI APARECER!
      
      // 1. CHAMA O SERVICE: O método subscribe inicia a chamada HTTP
      this.simulacaoService.enviarSimulacao(dadosSimulacao as any).subscribe({
        next: (resposta) => {
          alert(`Simulação enviada! ID de registro (Mock): ${resposta.id}`);
        
        // 1. Limpa o formulário inteiro (todos os campos ficam null)
        this.formSimulacao.reset(); 
        
        // 2. Redefine o Valor Desejado para o valor total da moto
        this.formSimulacao.get('valorDesejado')?.setValue(this.consorcioDetalhe?.valorTotal);
        
        // 3. ADIÇÃO CHAVE: Redefine o Número de Parcelas para a primeira opção (80)
        // Isso dispara o valueChanges e reativa o cálculo!
        this.formSimulacao.get('numeroParcelas')?.setValue(this.opcoesParcelas[0]); 
        
        // Não é necessário chamar calcularValorParcelas() explicitamente, 
        // pois a linha 3 dispara o valueChanges, que já faz a chamada internamente.
        }
      });
    } else {
      this.formSimulacao.markAllAsTouched();
    }
  }


  resetarFormulario(): void {
    this.formSimulacao.reset(); 
  }

}