// Dados das mesas
const mesas = {
  1: { total: 0, pedidos: [] },
  2: { total: 0, pedidos: [] },
  3: { total: 0, pedidos: [] },
  4: { total: 0, pedidos: [] },
  5: { total: 0, pedidos: [] }
};

let mesaSelecionada = null;

// Função para selecionar a mesa
function selecionarMesa(mesa) {
  mesaSelecionada = mesa;
  document.getElementById('mesa-selecionada').innerText = `Mesa Selecionada: ${mesa}`;
  atualizarPedidos();
}

// Função para adicionar pedido
function adicionarPedido() {
  const nome = document.getElementById('nome-lanche').value;
  const valor = parseFloat(document.getElementById('valor-lanche').value);

  if (!mesaSelecionada) {
    alert("Selecione uma mesa antes de adicionar o pedido!");
    return;
  }

  if (nome && !isNaN(valor)) {
    mesas[mesaSelecionada].pedidos.push({ nome, valor });
    mesas[mesaSelecionada].total += valor;
    atualizarPedidos();
    document.getElementById('nome-lanche').value = '';
    document.getElementById('valor-lanche').value = '';
  } else {
    alert("Preencha corretamente os campos de nome e valor.");
  }
}

// Função para atualizar a tabela de pedidos
function atualizarPedidos() {
  const tabela = document.getElementById('tabela-pedidos').getElementsByTagName('tbody')[0];
  tabela.innerHTML = '';

  const pedidos = mesas[mesaSelecionada].pedidos;
  pedidos.forEach((pedido, index) => {
    const row = tabela.insertRow();
    row.insertCell(0).innerText = pedido.nome;
    row.insertCell(1).innerText = `R$ ${pedido.valor.toFixed(2)}`;

    // Botão de alterar
    const btnAlterar = document.createElement('button');
    btnAlterar.innerText = "Alterar";
    btnAlterar.onclick = () => alterarPedido(index);
    row.insertCell(2).appendChild(btnAlterar);

    // Botão de excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.innerText = "Excluir";
    btnExcluir.onclick = () => excluirPedido(index);
    row.insertCell(3).appendChild(btnExcluir);
  });

  document.getElementById('total-mesa').innerText = `Total: R$ ${mesas[mesaSelecionada].total.toFixed(2)}`;
}

// Função para alterar pedido
function alterarPedido(index) {
  const novoNome = prompt("Insira o novo nome do lanche:");
  const novoValor = parseFloat(prompt("Insira o novo valor do lanche:"));

  if (novoNome && !isNaN(novoValor)) {
    mesas[mesaSelecionada].total -= mesas[mesaSelecionada].pedidos[index].valor;  // Subtrai o valor antigo
    mesas[mesaSelecionada].pedidos[index] = { nome: novoNome, valor: novoValor };  // Atualiza o pedido
    mesas[mesaSelecionada].total += novoValor;  // Adiciona o novo valor
    atualizarPedidos();
  } else {
    alert("Preencha corretamente os novos dados.");
  }
}

// Função para excluir pedido
function excluirPedido(index) {
  const pedido = mesas[mesaSelecionada].pedidos[index];
  mesas[mesaSelecionada].total -= pedido.valor; // Subtrai o valor do pedido
  mesas[mesaSelecionada].pedidos.splice(index, 1); // Remove o pedido da lista
  atualizarPedidos();
}

// Registro do Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch((error) => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}
