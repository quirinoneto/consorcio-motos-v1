import { Injectable } from '@angular/core';
import { Consorcio } from '../models/consorcio.model';
import { Observable, of } from 'rxjs';

/**
 * Serviço responsável por fornecer dados de consórcios.
 *
 * Observações gerais:
 * - Atualmente expõe dados simulados armazenados localmente em `consorciosData`.
 * - Ambos os métodos retornam `Observable` usando `of(...)`, o que permite que
 *   consumidores tratem a fonte de dados como assíncrona (compatível com HttpClient).
 * - O serviço é registrado como singleton (`providedIn: 'root'`).
 */
@Injectable({
  providedIn: 'root'
})
export class ConsorcioService {
  
  /**
   * Fonte de dados mock usada pelo serviço. Cada objeto obedece à interface
   * `Consorcio` definida em `src/app/models/consorcio.model.ts`.
   *
   * Observação: este array é retornado diretamente por `getConsorcios()` via
   * `of(this.consorciosData)`. Se preferir evitar mutação acidental por
   * consumidores, retorne uma cópia defensiva (ex.: `this.consorciosData.map(c => ({...c}))`).
   */
  private consorciosData: Consorcio[] = [
    {
              id: 1,
              moto: 'Honda CG 160',
              valorTotal: 12000,
              quantidadeParcelas: 80,
              parcelaMensal: 300,
              prazo: 48,
              status: 'Disponível'
          },
          {
              id: 2,
              moto: 'Yamaha YBR 125',
              valorTotal: 13000,
              quantidadeParcelas: 80,
              parcelaMensal: 320,
              prazo: 48,
              status: 'Esgotado'
          },
          {
              id: 3,
              moto: 'Suzuki Gixxer 150',
              valorTotal: 14000,
              quantidadeParcelas: 80,
              parcelaMensal: 350,
              prazo: 48,
              status: 'Em formação'
          }
  ];

  constructor() {}

  /**
   * Retorna a lista completa de consórcios como um `Observable` que emite
   * imediatamente e completa (criado com `of(...)`).
   *
   * Uso comum:
   * - `service.getConsorcios().subscribe(list => ...)`
   * - `consorcios$ = service.getConsorcios();` e usar `| async` no template.
   */
  getConsorcios(): Observable<Consorcio[]> {
    return of(this.consorciosData);
  }

  /**
   * Busca um consórcio por `id` e retorna `Observable<Consorcio | undefined>`.
   * Emite `undefined` quando o consórcio não existe.
   *
   * Observação: hoje essa busca é síncrona e embrulhada com `of`. Em um
   * cenário real com `HttpClient` a assinatura continuará igual, portanto
   * consumidores não precisarão mudar ao migrar para backend real.
   */
  getConsorcioById(id: number): Observable<Consorcio | undefined> {
    const consorcio = this.consorciosData.find(c => c.id === id);
    return of(consorcio);
  }

}
export type { Consorcio };

