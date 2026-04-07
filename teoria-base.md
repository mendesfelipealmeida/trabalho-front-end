# Parte Teorica (Base para PDF)

## 1. O que e uma API e como funciona o consumo em tempo real

API (Application Programming Interface) e uma interface que permite que sistemas diferentes se comuniquem. Em um projeto front-end, a API e usada para buscar dados atualizados de um servidor sem precisar escrever essas informacoes manualmente no HTML.

No consumo em tempo real (ou dinamico), o navegador faz uma requisicao HTTP para a API, recebe uma resposta em formato JSON e usa esses dados para atualizar a tela. Esse fluxo torna a aplicacao mais escalavel e mais proxima de cenarios reais de mercado.

No projeto desenvolvido, foi utilizada a API publica de Rick and Morty. A cada busca do usuario, o JavaScript realiza uma nova requisicao e mostra resultados atualizados conforme os filtros.

## 2. DOM manipulation e criacao de elementos dinamicos

DOM (Document Object Model) e a representacao da pagina HTML em forma de objetos manipulaveis por JavaScript.

Em vez de criar os cards manualmente no HTML, o codigo cria os elementos dinamicamente em tempo de execucao. Foram usados metodos como:

- `document.createElement`: cria novos elementos (card, imagem, titulo, etc.)
- `appendChild`: adiciona os elementos criados dentro da estrutura final do card
- `textContent`: preenche os textos com os dados da API

Essa abordagem atende ao requisito do trabalho de gerar os cards automaticamente via JavaScript.

## 3. Funcoes basicas usadas no consumo da API

### `fetch`
Responsavel por fazer a requisicao HTTP para a API.

### `then` e `catch` (ou `async/await`)
Controlam o fluxo assíncrono: sucesso da resposta, conversao para JSON e tratamento de erro.

### `createElement` e `appendChild`
Usados para construir visualmente os cards de personagens de forma dinamica.

### `querySelector` e `getElementById`
Permitem acessar campos da interface (busca, filtro, botoes, area de cards) e responder a interacao do usuario.

## 4. Motivo da escolha da API

A API Rick and Morty foi escolhida por quatro motivos principais:

1. E gratuita e publica, facilitando desenvolvimento e testes.
2. Possui boa documentacao e estrutura simples de dados.
3. Traz campos ideais para o projeto (nome, imagem, status, especie).
4. Permite filtros e paginacao, enriquecendo a experiencia da interface.

## 5. Regras de acesso e documentacao da API utilizada

URL base usada:
`https://rickandmortyapi.com/api/character`

Principais pontos:

- Nao exige token de autenticacao.
- Retorna dados em JSON.
- Suporta query params como `name`, `status` e `page`.
- Estrutura da resposta:
  - `info`: metadados (quantidade total e numero de paginas)
  - `results`: lista de personagens

Exemplo de endpoint com filtros:
`https://rickandmortyapi.com/api/character?name=rick&status=alive&page=1`

## Conclusao

O projeto demonstra os fundamentos de desenvolvimento front-end com dados reais: estrutura semantica em HTML, estilo responsivo em CSS e logica JavaScript para consumo de API e manipulacao dinamica do DOM. Com isso, os requisitos tecnicos da atividade foram atendidos de forma pratica e aplicavel ao contexto profissional.
