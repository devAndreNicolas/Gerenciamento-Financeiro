// js/Transacao.js

// Eu criei uma classe chamada Transacao que vai ser usada para representar uma transação no sistema
class Transacao {
  // O construtor da classe recebe cinco parâmetros: id, descricao, valor, tipo e pessoaId
  constructor(id, descricao, valor, tipo, pessoaId) {
    this.id = id; // Eu atribuí o valor de id ao atributo id da classe
    this.descricao = descricao; // Eu atribuí o valor de descricao ao atributo descricao da classe
    this.valor = valor; // Eu atribuí o valor de valor ao atributo valor da classe
    this.tipo = tipo; // Eu atribuí o valor de tipo (receita ou despesa) ao atributo tipo da classe
    this.pessoaId = pessoaId; // Eu atribuí o valor de pessoaId (referência a pessoa no cadastro) ao atributo pessoaId da classe
  }
}

// Eu exportei a classe Transacao para poder utilizá-la em outros arquivos do projeto
module.exports = Transacao;