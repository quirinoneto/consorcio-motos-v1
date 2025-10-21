import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ListaConsorcios } from './pages/lista-consorcios/lista-consorcios';
import { DetalheConsorcio } from './pages/detalhe-consorcio/detalhe-consorcio';

/**
 * Rotas principais da aplicação.
 *
 * Observações gerais:
 * - Cada rota mapeia um path para um componente de página (padrão SPA).
 * - Parâmetros de rota (ex.: `:id`) são lidos nos componentes via
 *   `ActivatedRoute.paramMap` ou `ActivatedRoute.snapshot.paramMap`.
 * - `redirectTo` com `pathMatch: 'full'` garante que a correspondência seja
 *   exata para a rota vazia.
 */
export const routes: Routes = [
    
    // Rota inicial: path vazio mapeado para o componente Home.
    // Nota: se houver redirecionamento para 'consorcios' também definido abaixo,
    // a ordem das rotas importa. Veja a seção de sugestões ao final.
    {
        path: '',
        component: Home
    },

    // Rota que exibe a lista de consórcios
    {
        path: 'consorcios',
        component: ListaConsorcios
    },

    // Rota com parâmetro dinâmico `id` para ver detalhes de um consórcio.
    // Ex.: /consorcios/3
    // O componente leitor do id normalmente faz:
    // `this.route.paramMap.subscribe(params => params.get('id'))`.
    {
        path: 'consorcios/:id',
        component: DetalheConsorcio
    },

    // Redirecionamento para o caminho 'consorcios' quando a rota for vazia.
    // `pathMatch: 'full'` garante que só redireciona quando a URL for exatamente ''.
    // Atenção: existe já uma rota com `path: ''` (Home). Ter ambos pode ser
    // redundante ou causar comportamento inesperado — considerar consolidar.
    {
        path: '',
        redirectTo: 'consorcios',
        pathMatch: 'full'
    }
];

/*
  Sugestões (não implementadas):
  - Substituir o segundo bloco com `path: ''` por um wildcard `**` para
    capturar rotas inválidas e redirecionar, ex.:
      { path: '**', redirectTo: 'consorcios' }
  - Se a intenção é ter a home em '', remova o redirect ou coloque-o antes
    conforme a lógica desejada. A ordem das rotas é relevante.
  - Considerar lazy-loading para módulos maiores:
      { path: 'consorcios', loadChildren: () => import('./pages/consorcios/consorcios.module').then(m => m.ConsorciosModule) }
  - Adicionar guards (ex.: `canActivate`) se houver requisitos de autenticação.
*/
