# Pessoas e Transações - Sistema de Gerenciamento Financeiro

## Descrição do Projeto

Este projeto é um sistema de gerenciamento financeiro que permite cadastrar pessoas e registrar suas transações financeiras (receitas e despesas). O sistema oferece uma interface web para interação do usuário e um backend para processamento e armazenamento de dados.

## Funcionalidades

- Cadastro de pessoas com nome e idade
- Registro de transações (receitas e despesas) associadas a pessoas
- Visualização de lista de pessoas com seus respectivos saldos
- Cálculo automático de saldos individuais e totais
- Restrição de cadastro de receitas para menores de 18 anos

## Tecnologias Utilizadas

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- Backend:
  - Node.js
  - Express.js
- Armazenamento de Dados:
  - Arquivos JSON (pessoas.json e transacoes.json)

## Estrutura do Projeto
projeto/
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── js/
│   ├── Pessoa.js
│   └── Transacao.js
│
├── server.js
├── pessoas.json
├── transacoes.json
└── README.md


## Instalação e Execução

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório: git clone [URL_DO_REPOSITÓRIO]
3. Navegue até a pasta do projeto: cd [NOME_DA_PASTA]
4. Instale as dependências: npm install
5. Inicie o servidor: node server.js
6. Acesse a aplicação em seu navegador através do endereço: http://localhost:3000


## Como Usar

1. **Adicionar Pessoa**: Preencha o formulário "Adicionar Pessoa" com nome e idade e clique em "Adicionar Pessoa".
2. **Adicionar Transação**: Selecione uma pessoa, preencha a descrição, valor e tipo de transação (receita ou despesa) e clique em "Adicionar Transação".
3. **Visualizar Dados**: As pessoas cadastradas e seus respectivos saldos serão exibidos na lista abaixo dos formulários.
4. **Excluir Pessoa**: Clique no botão "Deletar" ao lado das informações da pessoa para removê-la e suas transações associadas.

## Regras de Negócio

- Não é permitido cadastrar receitas para pessoas menores de 18 anos.
- O sistema calcula automaticamente o saldo de cada pessoa e o saldo total.
- Todas as informações são persistidas em arquivos JSON.

## Desenvolvimento

O projeto é estruturado da seguinte forma:

- `public/index.html`: Estrutura da página web.
- `public/style.css`: Estilos CSS para a interface.
- `public/script.js`: Lógica de interação do cliente com o servidor.
- `js/Pessoa.js`: Classe que representa uma pessoa.
- `js/Transacao.js`: Classe que representa uma transação.
- `server.js`: Servidor Express que gerencia as rotas e a lógica de negócio.

## Contato

[André Nicolas] - [devandrenicolas@gmail.com] [https://www.linkedin.com/in/devandrenicolas/]