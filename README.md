Descrição
Este projeto é um sistema front-end básico para a visualização e simulação de vendas de consórcio de motocicletas. Foi desenvolvido como um projeto de aprendizado inicial, focando na arquitetura moderna do Angular, gerenciamento de estado simulado (Services) e estilização de componentes.

🛠️ Stack Tecnológica
O projeto foi construído utilizando as seguintes tecnologias principais:

Framework: Angular 19 (Componentes Standalone)

Estilização: Tailwind CSS (Utility-First CSS)

Componentes UI: PrimeNG (Tabela/Grades e UI Elements)

Gerenciamento de Dados: RxJS (Observables e Service Architecture)

Versão: TypeScript

✨ Principais Funcionalidades (MVP)
Listagem de Consórcios: Exibição de todos os planos disponíveis utilizando o componente p-table do PrimeNG.

Roteamento Dinâmico: Navegação entre a lista e os detalhes do produto, capturando o ID do consórcio via ActivatedRoute.

Service Architecture: Implementação de um ConsorcioService para centralizar a lógica e simular a comunicação com uma API.

Data Binding: Uso de *ngFor, *ngIf, [ngClass] e Pipes (currency, pt-BR) para formatar e exibir os dados corretamente.