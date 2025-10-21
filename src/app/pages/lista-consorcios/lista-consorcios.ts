import { RouterLink } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importando os componentes do PrimeNG necessários
import { CardModule } from 'primeng/card';
import { TagModule} from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

import { ConsorcioService } from '../../services/consorcio';
import { Consorcio } from '../../models/consorcio.model';


// Mapeamento dos tipos aceitos pelo PrimeNG
type SeverityType = 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null | undefined;

/**
 * Página que lista os consórcios disponíveis.
 *
 * Padrões/Responsabilidades:
 * - Componente standalone (veja `standalone: true`) — importa `CommonModule` e
 *   `RouterLink` diretamente.
 * - Busca a lista de consórcios através de `ConsorcioService#getConsorcios()`
 *   que retorna um `Observable<Consorcio[]>` (mock atualmente).
 * - Mantém o resultado em `consorcios` e o template (`lista-consorcios.html`)
 *   itera sobre esse array para renderizar os itens.
 *
 * Observações:
 * - O padrão atual usa `subscribe(...)` para consumir o observable do serviço.
 *   Em componentes simples isto é aceitável, mas para evitar memory leaks em
 *   componentes que podem ser destruídos/reativados com frequência, prefira
 *   `async` pipe no template ou operadores RxJS com `takeUntil`/`firstValueFrom`.
 */
@Component({
  selector: 'app-lista-consorcios',
  standalone: true,
  imports: [RouterLink, CommonModule, ButtonModule, CardModule, TagModule],
  templateUrl: './lista-consorcios.html',
  styleUrls: ['./lista-consorcios.css']
})


export class ListaConsorcios implements OnInit {


    /** Lista de consórcios exibida no template. Inicialmente vazia. */
    consorcios: Consorcio[] = [];

    /**
     * Injeção do serviço que fornece os dados (mock/fixture).
     * - `ConsorcioService#getConsorcios()` retorna `Observable<Consorcio[]>`.
     */
    constructor(private consorcioService: ConsorcioService) { }

    /**
     * Inicialização do componente: requisita os consórcios ao serviço.
     *
     * Fluxo principal:
     * 1. Chama `consorcioService.getConsorcios()` que retorna um Observable.
     * 2. Inscreve-se com `subscribe` para receber o valor assíncrono.
     * 3. Quando os dados chegam, atribui ao campo `consorcios` e emite um log
     *    de depuração.
     *
     * Nota sobre `subscribe`:
     * - O `subscribe` cria uma inscrição que, em casos complexos, deve ser
     *   cancelada (ex.: em `ngOnDestroy`) para evitar memory leaks. Neste
     *   projeto, os componentes de página são simples; contudo, avaliar o uso
     *   do `async` pipe no template para gerenciamento automático do ciclo do
     *   observable.
     */

    

    getStatusSeverity(status: string): SeverityType {
            switch (status) {
                case 'Disponível':
                    return 'success';
                case 'Esgotado':
                    return 'danger';
                case 'Em formação':
                    return 'info';
                default:
                    return 'secondary';
            }
        }


    ngOnInit(): void {

        this.consorcioService.getConsorcios().subscribe(data => {
            // Atualiza o estado local com os dados recebidos do serviço
            this.consorcios = data;

            // Log útil para depuração local; remover em produção se desejado
            console.log('Consórcios carregados:', this.consorcios);
        });
     }
}
