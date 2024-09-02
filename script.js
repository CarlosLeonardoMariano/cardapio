let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartItems.innerHTML = '';
    cart.forEach((cartItem, index) => {
        cartItems.innerHTML += `<li>${cartItem.item} - R$ ${cartItem.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remover</button></li>`;
    });
    totalDisplay.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    document.getElementById('checkout').style.display = 'block';
}

function checkPaymentMethod() {
    const paymentMethod = document.getElementById('payment-method').value;
    const pixMessage = document.getElementById('pix-message');

    if (paymentMethod === 'pix') {
        pixMessage.style.display = 'block';
    } else {
        pixMessage.style.display = 'none';
    }

    const cashOptions = document.getElementById('cash-options');
    cashOptions.style.display = paymentMethod === 'dinheiro' ? 'block' : 'none';
    if (paymentMethod !== 'dinheiro') {
        document.getElementById('change-needed').checked = false;
        document.getElementById('change-amount').style.display = 'none';
    }
}

function toggleChangeInput() {
    const changeNeeded = document.getElementById('change-needed').checked;
    const changeAmount = document.getElementById('change-amount');
    changeAmount.style.display = changeNeeded ? 'block' : 'none';
    if (!changeNeeded) {
        document.getElementById('cash-amount').value = '';
        document.getElementById('change').textContent = '0.00';
    }
}

function calculateChange() {
    const cashAmount = parseFloat(document.getElementById('cash-amount').value);
    const changeDisplay = document.getElementById('change');
    if (!isNaN(cashAmount) && cashAmount >= total) {
        const change = cashAmount - total;
        changeDisplay.textContent = change.toFixed(2);
    } else {
        changeDisplay.textContent = '0.00';
    }
}

function checkDeliveryOption() {
    const deliveryOption = document.getElementById('delivery-option').value;
    const deliveryInfo = document.getElementById('delivery-info');
    deliveryInfo.style.display = deliveryOption === 'entrega' ? 'block' : 'none';
}

function confirmOrder() {
    const orderSummary = document.getElementById('order-summary');
    const orderDetails = document.getElementById('order-details');
    orderSummary.style.display = 'block';

    let summaryText = 'Pedido Confirmado:\n\n';
    cart.forEach((cartItem, index) => {
        summaryText += `${index + 1}. ${cartItem.item} - R$ ${cartItem.price.toFixed(2)}\n`;
    });
    summaryText += `\nTotal: R$ ${total.toFixed(2)}\n\n`;
    summaryText += `Método de Pagamento: ${document.getElementById('payment-method').value}\n`;
    summaryText += `Precisa de Troco: ${document.getElementById('change-needed').checked ? 'Sim' : 'Não'}\n`;
    if (document.getElementById('change-needed').checked) {
        summaryText += `Valor da Nota: R$ ${parseFloat(document.getElementById('cash-amount').value).toFixed(2)}\n`;
        summaryText += `Troco: R$ ${document.getElementById('change').textContent}\n`;
    }
    summaryText += `Retirada ou Entrega: ${document.getElementById('delivery-option').value}\n`;
    if (document.getElementById('delivery-option').value === 'entrega') {
        summaryText += `Endereço: ${document.getElementById('address').value}\n`;
        summaryText += `Nome: ${document.getElementById('name').value}\n`;
    }

    const observations = document.getElementById('observations').value;
    if (observations) {
        summaryText += `\nObservações: ${observations}\n`;
    }

    orderDetails.textContent = summaryText;
}

function copyOrderDetails() {
    const orderDetails = document.getElementById('order-details');
    navigator.clipboard.writeText(orderDetails.textContent).then(() => {
        alert('Seu Pedido foi copiado, Cole na caixa de mensagem Para enviar!');
    });
}




// FAZENDO AS INFORMAÇÕES APOS CLICAR NO TEMPO DA ENTREGA

function toggleInfo() {
    var infoBox = document.getElementById('info-box');
    var overlay = document.getElementById('overlay');
    
    if (infoBox.style.display === 'block') {
        // Ocultar infoBox
        infoBox.classList.remove('show');
        setTimeout(function() {
            infoBox.style.display = 'none';
            overlay.style.display = 'none';
        }, 10); // Tempo para animação de ocultar
    } else {
        // Mostrar infoBox
        infoBox.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(function() {
            infoBox.classList.add('show');
        }, 5); // Breve atraso para garantir que a classe de exibição seja aplicada
    }
}



// FAZENDO INFORMAÇÕES DO RELOGIO DA LOJA

function infoRelogio() {
    let infoHorario = document.querySelector("#info-pontos")
    let overlay2 = document.getElementById('overlay2');


    if(infoHorario.style.display ==='block'){
        infoHorario.classList.remove('show2')
        setTimeout(function(){
            infoHorario.style.display = 'none'
            overlay2.style.display = 'none'
        },10)

        } else
            { infoHorario.style.display = 'block'
                overlay2.style.display = 'block'
                setTimeout(function(){
                    infoHorario.classList.add('show2');
                    updateRelogioStatus();
                },5)
           }
        }










        function updateRelogioStatus() {
            let relogioStatus = document.getElementById('relogio-status');
            let currentTime = new Date();
            let currentHour = currentTime.getHours();
            let currentMinute = currentTime.getMinutes();
            let currentSegundos = currentTime.getSeconds();

            // Horários de funcionamento (ajuste conforme necessário)
            let openingHour = 18; // 18:00
            let closingHour = 23; // 23:00

            if (currentHour >= openingHour && currentHour <= closingHour) {
                if (currentHour === closingHour && currentMinute > 0) {
                    relogioStatus.classList.add('fechar');
                    relogioStatus.classList.remove('aberto');
                    relogioStatus.textContent = '🕗 Fechado';
                } else {
                    relogioStatus.classList.add('aberto');
                    relogioStatus.classList.remove('fechar');
                    relogioStatus.textContent = '🕗 Aberto';
                }
            } else {
                relogioStatus.classList.add('fechar');
                relogioStatus.classList.remove('aberto');
                relogioStatus.textContent = '🕗 Fechado';
            }
        }

        // Verifica o status do relógio ao carregar a página
        window.onload = updateRelogioStatus;






function togglePontos(){

    let pontos = document.querySelector('#info-pontostrocas')
    let overlay3 = document.querySelector('#overlay3')

    if(pontos.style.display ==='block'){
        pontos.classList.remove('show3') ;setTimeout(function(){
            pontos.style.display = 'none'
            overlay3.style.display = 'none'},10)

    } else{
        pontos.style.display = 'block'
        overlay3.style.display = 'block'
        setTimeout(function(){
            pontos.classList.add('show3');
        },5)
    }

}