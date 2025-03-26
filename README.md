Estou deixando esse readme como pedido. Decidi dividir as instruções em readme propios de cada projeto. Percebera que tem duas pastas cada uma possui seu propio readme.

# Teste Técnico - Desenvolvedor Frontend (ASP.NET MVC, Vue.js, React Native)

## Descrição do Teste
Bem-vindo ao teste técnico para a posição de Desenvolvedor Frontend! O objetivo deste desafio é avaliar suas habilidades na criação de interfaces Web e Mobile integradas à API REST da Frenet.

Para realizar esse teste você tem a opção de desenvolver **uma aplicação web** utilizando Vue.

As aplicação devem permitir a cotação de frete utilizando a API da Frenet disponível em: [Frenet API Docs](https://frenetapi.docs.apiary.io/#reference/shipping/shippingquote/post).

## Requisitos
### 1. Funcionalidades Obrigatórias

- Criar um formulário contendo os seguintes campos:
	- CEP de origem (`cep_origin`)
	- CEP de destino (`cep_destination`)
	- Peso do produto (kg) (`weight`)
	- Largura (cm) (`width`)
	- Altura (cm) (`height`)
	- Comprimento (cm) (`length`)
	- Valor declarado (`declared_value`)
- Enviar os dados para a API e exibir os resultados da cotação em tela.

### 2. Diferenciais

Fique à vontade para ir além do que foi listado como obrigatório e refinar a solução apresentada, seja na experiência final, seja na questão técnica. Alguns exemplos:

- Implementação de testes unitários.
- Melhorias na interface utilizando boas práticas de UX/UI.
- Persistência do histórico de cotações utilizando local storage (Web) e AsyncStorage (Mobile).
- Bibliotecas de gerenciamento de estado.
- Cache para evitar requisições repetidas dentro de um intervalo de tempo.
- ....

## Tecnologias Esperadas

- **Web**: Vue
- **Versionamento de código**: Git

## Como Submeter o Teste

1. Crie um repositório Git público para seu código.
2. Coloque esse README na raiz.
3. Desenvolva a aplicação documentando seu progresso através de commits.
4. Atualize este README com instruções claras de como rodar os projetos.
5. Envie o link do repositório para avaliação.

## Critérios de Avaliação

- **Qualidade do código**: organização, boas práticas e padrões.
- **Estrutura do projeto**: organização e modularização do código.
- **Uso correto da API**: implementação correta da integração.
- **Experiência do usuário**: layout intuitivo e responsivo.
- **Desempenho e otimizações**: caching, debounce em requisições, etc.

Se tiver dúvidas, fique à vontade para perguntar!

Boa sorte! 🚀
