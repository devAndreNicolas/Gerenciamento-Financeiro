const express = require('express'); // Importa o módulo express para criar a aplicação web
const fs = require('fs'); // Importa o módulo fs (file system) para ler e escrever arquivos
const path = require('path'); // Importa o módulo path para manipulação de caminhos de arquivos

const app = express(); // Cria uma instância do express
const port = 3000; // Define a porta onde o servidor irá rodar

// Configura o express para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configura o express para tratar requisições com corpo em JSON
app.use(express.json());

// Declaração de arrays em memória para armazenar pessoas e transações
let pessoas = [];
let transacoes = [];

// Lê o arquivo 'pessoas.json' e carrega as pessoas para o array
fs.readFile('./pessoas.json', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo de pessoas:', err);
  } else {
    pessoas = JSON.parse(data); // Converte o JSON para um objeto JavaScript
  }
});

// Lê o arquivo 'transacoes.json' e carrega as transações para o array
fs.readFile('./transacoes.json', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo de transações:', err);
  } else {
    transacoes = JSON.parse(data); // Converte o JSON para um objeto JavaScript
  }
});

// Função para salvar os dados no arquivo, escrevendo os arrays 'pessoas' e 'transacoes'
function salvarDados() {
  fs.writeFileSync('./pessoas.json', JSON.stringify(pessoas, null, 2)); // Salva 'pessoas.json'
  fs.writeFileSync('./transacoes.json', JSON.stringify(transacoes, null, 2)); // Salva 'transacoes.json'
}

// Rota GET para a página inicial (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Envia o arquivo HTML para o cliente
});

// Rota POST para criar uma nova pessoa
app.post('/pessoas', (req, res) => {
  const { nome, idade } = req.body; // Recebe os dados da nova pessoa
  const id = pessoas.length + 1; // Gera um ID único para a nova pessoa
  const novaPessoa = { id, nome, idade }; // Cria um objeto com os dados da nova pessoa
  pessoas.push(novaPessoa); // Adiciona a nova pessoa ao array 'pessoas'
  salvarDados(); // Salva as alterações no arquivo
  res.status(201).json(novaPessoa); // Retorna a nova pessoa com status de sucesso
});

// Rota DELETE para deletar uma pessoa e suas transações
app.delete('/pessoas/:id', (req, res) => {
  const id = parseInt(req.params.id); // Obtém o ID da pessoa a ser excluída
  pessoas = pessoas.filter(pessoa => pessoa.id !== id); // Remove a pessoa pelo ID
  transacoes = transacoes.filter(transacao => transacao.pessoaId !== id); // Remove as transações relacionadas a essa pessoa
  salvarDados(); // Salva as alterações no arquivo
  res.status(200).json({ message: 'Pessoa e suas transações deletadas' }); // Retorna uma mensagem de sucesso
});

// Rota GET para listar todas as pessoas
app.get('/pessoas', (req, res) => {
  res.json(pessoas); // Retorna o array 'pessoas' em formato JSON
});

// Rota POST para criar uma nova transação
app.post('/transacoes', (req, res) => {
  const { descricao, valor, tipo, pessoaId } = req.body; // Recebe os dados da nova transação
  const pessoa = pessoas.find(p => p.id === pessoaId); // Busca a pessoa associada à transação

  if (!pessoa) {
    return res.status(400).json({ error: 'Pessoa não encontrada' }); // Caso a pessoa não exista, retorna um erro
  }

  // Valida que menores de idade não podem registrar receitas
  if (tipo === 'receita' && pessoa.idade < 18) {
    return res.status(400).json({ error: 'Menores de idade não podem cadastrar receitas.' });
  }

  const id = transacoes.length + 1; // Gera um ID único para a nova transação
  const novaTransacao = { id, descricao, valor, tipo, pessoaId }; // Cria a nova transação
  transacoes.push(novaTransacao); // Adiciona a transação ao array 'transacoes'
  salvarDados(); // Salva as alterações no arquivo
  res.status(201).json(novaTransacao); // Retorna a nova transação com status de sucesso
});

// Rota GET para listar todas as transações
app.get('/transacoes', (req, res) => {
  res.json(transacoes); // Retorna o array 'transacoes' em formato JSON
});

// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`); // Mensagem indicando que o servidor foi iniciado
});