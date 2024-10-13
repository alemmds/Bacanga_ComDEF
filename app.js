// app.js

let tables = []; // Array para armazenar as mesas
let orders = []; // Array para armazenar os pedidos

document.getElementById('add-table').addEventListener('click', addTable);
document.getElementById('confirm-order').addEventListener('click', confirmOrder);

function addTable() {
    const tableCount = tables.length + 1;
    if (tableCount <= 5) {
        tables.push(tableCount);
        const option = document.createElement('option');
        option.value = tableCount;
        option.textContent = `Mesa ${tableCount}`;
        document.getElementById('mesa-select').appendChild(option);
        document.getElementById('pedido-area').style.display = 'block'; // Mostrar a área de pedidos
    } else {
        alert('Número máximo de mesas atingido!');
    }
}

function confirmOrder() {
    const mesaSelect = document.getElementById('mesa-select');
    const itemName = document.getElementById('item-name').value;
    const itemValue = parseFloat(document.getElementById('item-value').value);
    const mesaNumber = mesaSelect.value;

    if (mesaNumber && itemName && !isNaN(itemValue) && itemValue > 0) {
        const order = {
            mesa: mesaNumber,
            name: itemName,
            value: itemValue
        };

        // Adiciona o pedido ao array de pedidos
        orders.push(order);

        // Atualiza a tabela de pedidos
        updateOrderTable();
        updateMesaTotal(mesaNumber);
        
        // Limpa os campos
        document.getElementById('item-name').value = '';
        document.getElementById('item-value').value = '';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function updateOrderTable() {
    const tbody = document.querySelector('#orders tbody');
    tbody.innerHTML = ''; // Limpa a tabela antes de atualizar

    // Ordena os pedidos por mesa
    const sortedOrders = orders.sort((a, b) => a.mesa - b.mesa);

    sortedOrders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.mesa}</td>
            <td>${order.name}</td>
            <td>R$ ${order.value.toFixed(2)}</td>
            <td>
                <button onclick="editOrder(${index})">Alterar</button>
                <button onclick="deleteOrder(${index})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function updateMesaTotal(mesaNumber) {
    const mesaOrders = orders.filter(order => order.mesa == mesaNumber);
    const totalValue = mesaOrders.reduce((sum, order) => sum + order.value, 0);
    
    // Exibe o valor total em algum lugar (você pode adicionar um elemento para isso)
    console.log(`Total da Mesa ${mesaNumber}: R$ ${totalValue.toFixed(2)}`);
    // Aqui você pode atualizar um elemento específico na página se desejar
}

function editOrder(index) {
    const order = orders[index];
    document.getElementById('mesa-select').value = order.mesa;
    document.getElementById('item-name').value = order.name;
    document.getElementById('item-value').value = order.value;
    
    // Remove o pedido original antes de adicionar a alteração
    deleteOrder(index);
}

function deleteOrder(index) {
    orders.splice(index, 1);
    updateOrderTable();
}

// Função para exibir o total na interface
function displayTotalForMesa() {
    const mesaNumbers = [...new Set(orders.map(order => order.mesa))]; // Obtém números únicos das mesas
    mesaNumbers.forEach(mesa => {
        const mesaOrders = orders.filter(order => order.mesa == mesa);
        const totalValue = mesaOrders.reduce((sum, order) => sum + order.value, 0);
        console.log(`Total da Mesa ${mesa}: R$ ${totalValue.toFixed(2)}`);
        // Aqui você pode adicionar código para atualizar a interface
    });
}
