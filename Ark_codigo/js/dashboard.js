let userLogado = JSON.parse(localStorage.getItem('userLogado'))
let logado = document.querySelector('#logado')
if (localStorage.getItem('token') != null) {
    logado.innerHTML = `<h3>${userLogado.loginCad}</h3>`
}  else {
    window.location.assign("auth.html")
    logado.innerHTML = ''
}



// FUNÇÃO DO DEPÓSITO DE SALDO NO USUÁRIO
const saldoElement1 = document.querySelector('#saldo');
const saldoElement2 = document.querySelector('.saldo2');

// FORMATA O SALDO PARA O FORMATO BRL (R$)
function formatarSaldo(saldo) {
  return saldo.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// FUNÇÃO DE ATUALIZAR O SALDO E MOSTRAR O MESMO
function atualizarSaldo() {
  const userLogado = JSON.parse(localStorage.getItem('userLogado'));

  if (userLogado && userLogado.hasOwnProperty('saldo')) {
    const saldo = userLogado.saldo;
    const saldoFormatado = formatarSaldo(saldo);
    saldoElement1.innerHTML = `<h4>${saldoFormatado}</h4>`;
    saldoElement2.innerHTML = `<h1>${saldoFormatado}</h1>`;
  }
}

// COLETA O INPUT E O BOTÃO
const inputSaldo = document.querySelector('#saldoInput');
const saldoBtn = document.querySelector('#adicionarSaldoBtn');

// FUNÇÃO PARA MOSTRAR OS ALERTAS
function mostrarAlerta(mensagem, tipo) {
  const alerta = document.createElement('div');
  alerta.classList.add('alerta');
  alerta.classList.add(`alerta-${tipo}`);
  alerta.textContent = mensagem;

  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.style.opacity = 0;
    alerta.style.transform = 'translateX(100%)';
    setTimeout(() => {
      alerta.remove();
    }, 300);
  }, 5000);

  setTimeout(() => {
    alerta.classList.add('alerta-aparecer');
  }, 100);
}

// FUNÇÃO PARA ADICIONAR O SALDO
function adicionarSaldo() {
  const saldo = parseFloat(inputSaldo.value);

  if (!isNaN(saldo)) {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));

    if (userLogado) {
      userLogado.saldo += saldo;
      localStorage.setItem('userLogado', JSON.stringify(userLogado));
        // CASO SUCESSO, ENVIA UM ALERTA COM A MENSAGEM
      mostrarAlerta(`✅ R$ ${saldo} adicionados com sucesso!`, 'sucesso');
      atualizarSaldo(); // Atualizar o saldo após adicionar saldo
    } else {
        // CASO NÃO ESTEJA LOGADO, ENVIA ERRO
      mostrarAlerta('❌ Usuário não encontrado', 'erro');
    }
  } else {
    // CASO O VALOR NÃO SEJA UM NÚMERO, ENVIA UM ERRO
    mostrarAlerta('❌ Insira um valor válido', 'erro');
  }
}

// Chamar a função de atualização do saldo ao carregar a página
window.addEventListener('DOMContentLoaded', atualizarSaldo);

// Chamar a função de atualização do saldo sempre que houver uma alteração no campo de saldo
inputSaldo.addEventListener('input', atualizarSaldo);

// Adicionar um ouvinte de evento ao botão "Adicionar saldo"
saldoBtn.addEventListener('click', adicionarSaldo);

// Estilos CSS para o alerta
const estilosAlerta1 = `
.alerta {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 2rem 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 4px var(--color-primary-light);
  background-color: var(--color-white);
  font-size: 16px;
  z-index: 9999;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  margin-right: 20px;
  opacity: 0;
  transform: translateX(100%);
}

.alerta.sucesso {
  color: var(--color-success);
}

.alerta.erro {
  color: var(--color-danger);
}

.alerta.fade {
  opacity: 0;
}

.alerta.alerta-aparecer {
  opacity: 1;
  transform: translateX(0%);
}

@media (max-width: 1024px) {
  .alerta {
    font-size: 14px;
  }
}

@media (max-width: 600px) {
  .alerta {
    bottom: 10px;
    right: 10px;
    padding: 8px 16px;
    font-size: 12px;
  }
}
`;

// Criar um elemento <style> e adicionar os estilos do alerta
const styleElement = document.createElement('style');
styleElement.textContent = estilosAlerta1;
document.head.appendChild(styleElement);




// PEGA O EVENTO DE CARREGAR A PAGINA
saldoBtn.addEventListener('click', adicionarSaldo);
// ATUALIZA AS INFORMAÇÕES SEMPRE QUE A PÁGINA É CARREGADA
window.addEventListener('DOMContentLoaded', () => {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));

    if (userLogado) {
      // EXIBE OS SALDOS (PUXA FUNÇÃO)
        atualizarSaldo();
        // atualizarSaldoBitcoin();
    } else {
        console.log('usuario nao encontrado')
    }
})



// FUNÇÃO PARA LOGOUT, RETIRA O TOKEN DO USUÁRIO E O ENVIA PARA TELA DE LOGIN
function sair() {
    localStorage.removeItem('token');
    setTimeout(() => {
        window.location.assign("auth.html");
    }, 750)
}

