let pedidos = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: []
};
let mesaAtual = 1;

function selecionarMesa(mesa) {
    mesaAtual = mesa;
    exibirPedidosPorMesa(mesa);
}

function adicionarPedido() {
    const nomeLanche = document.getElementById('nome-lanche').value;
    const valorLanche = parseFloat(document.getElementById('valor-lanche').value);

    if (nomeLanche && valorLanche) {
        pedidos[mesaAtual].push({ nome: nomeLanche, valor: valorLanche });
        exibirPedidosPorMesa(mesaAtual);
        limparCampos();
    } else {
        alert("Por favor, insira o nome e valor do lanche.");
    }
}

function exibirPedidosPorMesa(mesa) {
    const pedidosMesa = pedidos[mesa];
    const pedidosDiv = document.getElementById('pedidos');
    pedidosDiv.innerHTML = `<h3>Mesa ${mesa}</h3>`;

    let total = 0;
    pedidosMesa.forEach((pedido, index) => {
        pedidosDiv.innerHTML += `<p>${pedido.nome} - R$ ${pedido.valor.toFixed(2)}
            <button onclick="alterarPedido(${mesa}, ${index})">Alterar</button>
            <button onclick="excluirPedido(${mesa}, ${index})">Excluir</button></p>`;
        total += pedido.valor;
    });

    pedidosDiv.innerHTML += `<p><strong>Total: R$ ${total.toFixed(2)}</strong></p>`;
}

function alterarPedido(mesa, index) {
    const nomeLanche = prompt("Alterar nome do lanche:", pedidos[mesa][index].nome);
    const valorLanche = parseFloat(prompt("Alterar valor do lanche:", pedidos[mesa][index].valor));

    if (nomeLanche && valorLanche) {
        pedidos[mesa][index] = { nome: nomeLanche, valor: valorLanche };
        exibirPedidosPorMesa(mesa);
    }
}

function excluirPedido(mesa, index) {
    pedidos[mesa].splice(index, 1);
    exibirPedidosPorMesa(mesa);
}

function limparCampos() {
    document.getElementById('nome-lanche').value = '';
    document.getElementById('valor-lanche').value = '';
}
