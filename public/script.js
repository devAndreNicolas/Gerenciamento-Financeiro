// Aguardando o carregamento completo do conteúdo da página (DOM) antes de executar a função
document.addEventListener('DOMContentLoaded', function () {

  // Função para carregar a lista de pessoas e suas transações
  function carregarPessoas() {
    // Fazendo uma requisição para pegar os dados das pessoas no servidor
    fetch('/pessoas')
      .then(response => response.json()) // Convertendo a resposta para JSON
      .then(pessoas => {
        // Fazendo uma requisição para pegar as transações das pessoas
        fetch('/transacoes')
          .then(response => response.json()) // Convertendo a resposta para JSON
          .then(transacoes => {
            // Pegando o elemento HTML onde vamos exibir as pessoas
            const listaPessoas = document.getElementById('listaPessoas');
            listaPessoas.innerHTML = ''; // Limpando a lista antes de adicionar novas pessoas

            // Variáveis para controlar o total de receitas e despesas
            let totalReceitasResidenciais = 0;
            let totalDespesasResidenciais = 0;

            // Percorrendo todas as pessoas e calculando suas receitas e despesas
            pessoas.forEach(pessoa => {
              // Filtrando as transações que pertencem a essa pessoa
              const transacoesPessoa = transacoes.filter(t => t.pessoaId === pessoa.id);

              let totalReceitas = 0;
              let totalDespesas = 0;

              // Percorrendo as transações dessa pessoa para calcular as receitas e despesas
              transacoesPessoa.forEach(transacao => {
                if (transacao.tipo === 'receita') {
                  totalReceitas += transacao.valor; // Somando as receitas
                } else if (transacao.tipo === 'despesa') {
                  totalDespesas += transacao.valor; // Somando as despesas
                }
              });

              // Calculando o saldo da pessoa (receitas - despesas)
              const saldo = totalReceitas - totalDespesas;

              // Criando o HTML para exibir a pessoa e suas informações financeiras
              const pessoaDiv = document.createElement('div');
              pessoaDiv.classList.add('pessoa'); // Adicionando a classe para estilizar
              pessoaDiv.innerHTML = `
                <p>ID: ${pessoa.id}</p>
                <p>${pessoa.nome}, ${pessoa.idade} anos</p>
                <p>Receitas: R$ ${totalReceitas.toFixed(2)}</p>
                <p>Despesas: R$ ${totalDespesas.toFixed(2)}</p>
                <p>Saldo: R$ ${saldo.toFixed(2)}</p>
                <button class="deletar" data-id="${pessoa.id}">Deletar</button>
              `;
              listaPessoas.appendChild(pessoaDiv); // Adicionando a pessoa à lista no HTML

              // Atualizando os totais residenciais de receitas e despesas
              totalReceitasResidenciais += totalReceitas;
              totalDespesasResidenciais += totalDespesas;
            });

            // Exibindo os totais residenciais de receitas, despesas e saldo
            const saldoResidencial = totalReceitasResidenciais - totalDespesasResidenciais;
            document.getElementById('totalReceitas').textContent = totalReceitasResidenciais.toFixed(2);
            document.getElementById('totalDespesas').textContent = totalDespesasResidenciais.toFixed(2);
            document.getElementById('totalSaldo').textContent = saldoResidencial.toFixed(2);

            // Preenchendo o select de pessoas no formulário
            const pessoaSelect = document.getElementById('pessoaId');
            pessoaSelect.innerHTML = '<option value="">Selecione uma Pessoa</option>';
            pessoas.forEach(pessoa => {
              const option = document.createElement('option');
              option.value = pessoa.id; // Atribuindo o ID da pessoa como valor
              option.textContent = `${pessoa.id} - ${pessoa.nome}`; // Exibindo o ID e o nome
              pessoaSelect.appendChild(option); // Adicionando a opção ao select
            });

            // Adicionando evento para o botão de deletar
            const botoesDeletar = document.querySelectorAll('.deletar');
            botoesDeletar.forEach(botao => {
              botao.addEventListener('click', function () {
                const id = this.getAttribute('data-id'); // Pegando o ID da pessoa
                deletarPessoa(id); // Chamando a função para deletar a pessoa
              });
            });
          });
      })
      .catch(error => console.error('Erro ao carregar as pessoas:', error)); // Tratamento de erro
  }

  // Função para deletar uma pessoa do banco de dados
  function deletarPessoa(id) {
    fetch(`/pessoas/${id}`, {
      method: 'DELETE', // Usando método DELETE para remover a pessoa
    })
      .then(response => response.json()) // Convertendo a resposta para JSON
      .then(() => {
        carregarPessoas(); // Recarregando a lista de pessoas após a exclusão
      })
      .catch(error => console.error('Erro ao deletar a pessoa:', error)); // Tratamento de erro
  }

  // Adicionando evento para o formulário de cadastro de pessoas
  const formPessoa = document.getElementById('formPessoa');
  formPessoa.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenindo o envio do formulário
    const nome = document.getElementById('nome').value; // Pegando o nome
    const idade = document.getElementById('idade').value; // Pegando a idade

    // Verificando se a pessoa já está cadastrada
    fetch('/pessoas')
      .then(response => response.json()) // Convertendo a resposta para JSON
      .then(pessoas => {
        const pessoaExistente = pessoas.find(p => p.nome === nome && p.idade === parseInt(idade));
        if (pessoaExistente) {
          alert('Pessoa já cadastrada!'); // Alerta se a pessoa já estiver cadastrada
        } else {
          const pessoa = { nome, idade: parseInt(idade) }; // Criando o objeto da pessoa

          // Enviando o objeto da pessoa para o servidor para ser cadastrado
          fetch('/pessoas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pessoa),
          })
            .then(response => response.json()) // Convertendo a resposta para JSON
            .then(() => {
              carregarPessoas(); // Recarregando a lista de pessoas após o cadastro
            })
            .catch(error => console.error('Erro ao adicionar a pessoa:', error)); // Tratamento de erro
        }
      });
  });

  // Adicionando evento para o formulário de transações
  const formTransacao = document.getElementById('formTransacao');
  formTransacao.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenindo o envio do formulário

    const pessoaId = document.getElementById('pessoaId').value; // Pegando o ID da pessoa
    const descricao = document.getElementById('descricao').value; // Pegando a descrição da transação
    const valor = parseFloat(document.getElementById('valor').value); // Pegando o valor da transação
    const tipo = document.getElementById('tipo').value; // Pegando o tipo de transação (receita ou despesa)

    if (!pessoaId) {
      alert('Selecione uma pessoa!'); // Alerta se não selecionar uma pessoa
      return;
    }

    // Verificando se a transação é de receita e se a pessoa tem menos de 18 anos
    fetch('/pessoas')
      .then(response => response.json()) // Convertendo a resposta para JSON
      .then(pessoas => {
        const pessoa = pessoas.find(p => p.id === parseInt(pessoaId));
        if (tipo === 'receita' && pessoa.idade < 18) {
          alert('Não é possível realizar transações de receita para menores de 18 anos.'); // Alerta se tentar adicionar receita para menor de idade
          return;
        }

        const transacao = { descricao, valor, tipo, pessoaId: parseInt(pessoaId) }; // Criando o objeto da transação

        // Enviando a transação para o servidor para ser cadastrada
        fetch('/transacoes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transacao),
        })
          .then(response => response.json()) // Convertendo a resposta para JSON
          .then(() => {
            carregarPessoas(); // Recarregando a lista de pessoas após adicionar a transação
          })
          .catch(error => console.error('Erro ao adicionar a transação:', error)); // Tratamento de erro
      });
  });

  // Carregando as pessoas inicialmente quando a página for carregada
  carregarPessoas();

});