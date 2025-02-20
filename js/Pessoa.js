// js/Pessoa.js

// Eu criei uma classe chamada Pessoa que vai ser usada para representar uma pessoa no cadastro
class Pessoa {
  // O construtor da classe recebe três parâmetros: id, nome e idade
  constructor(id, nome, idade) {
    this.id = id; // Eu atribuí o valor de id ao atributo id da classe
    this.nome = nome; // Eu atribuí o valor de nome ao atributo nome da classe
    this.idade = idade; // Eu atribuí o valor de idade ao atributo idade da classe
  }
}

// Eu exportei a classe Pessoa para poder utilizá-la em outros arquivos do projeto
module.exports = Pessoa;