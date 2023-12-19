const quantidadeInput = document.querySelector('#quantidadeInput');
const criptoSelect = document.querySelector('#criptoSelect');
const trocarBtn = document.querySelector('#trocarBtn');
const saldoNecessarioElement = document.querySelector('#saldoNecessario');
const saldoElement = document.querySelector('#saldo');

let taxasConversao = {};

const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,solana,bitcoin-cash,cardano&vs_currencies=brl';

async function obterCotacoes() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    taxasConversao = data;
  } catch (error) {
    console.error('Erro ao obter as cotações:', error);
  }
}

async function atualizarTaxasConversaoPeriodicamente() {
  await obterCotacoes();
  setInterval(obterCotacoes, 60000);
}

function formatarNumeroAbreviado(numero) {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  const magnitude = Math.floor(Math.log10(numero) / 3);
  const abreviacao = suffixes[magnitude];
  const valorAbreviado = (numero / Math.pow(1000, magnitude)).toFixed(2);
  return `${valorAbreviado}${abreviacao}`;
}

function formatarSaldo(saldo) {
  return saldo.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function formatarQuantidade(numero) {
  if (numero >= 1000) {
    return formatarNumeroAbreviado(numero);
  }
  return numero.toFixed(2);
}

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

function trocarPorCripto() {
  const quantidade = parseFloat(quantidadeInput.value);
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));

  if (userLogado) {
    const criptoSelecionada = criptoSelect.value;
    const taxaConversao = taxasConversao[criptoSelecionada].brl;
    const saldoMaximo = userLogado.saldo / taxaConversao;

    if (!isNaN(quantidade)) {
      const saldoNecessario = quantidade * taxaConversao;

      if (saldoNecessario <= userLogado.saldo) {
        userLogado.saldo -= saldoNecessario;

        if (userLogado[criptoSelecionada]) {
          userLogado[criptoSelecionada] += quantidade;
        } else {
          userLogado[criptoSelecionada] = quantidade;
        }

        localStorage.setItem("userLogado", JSON.stringify(userLogado));
        atualizarSaldo();
        atualizarQuantidadeMaxima();
        mostrarAlerta(`✅ Troca realizada com sucesso!`, 'sucesso');
      } else {
        mostrarAlerta(`❌ Saldo insuficiente. Saldo necessário: ${formatarSaldo(saldoNecessario)}`, 'erro');
      }
    } else {
      mostrarAlerta("❌ Por favor, insira uma quantidade numérica válida de criptomoedas.", 'erro');
    }
  } else {
    mostrarAlerta("❌ Usuário não encontrado. Faça login primeiro.", 'erro');
  }
}

function atualizarQuantidadeMaxima() {
  const criptoSelecionada = criptoSelect.value;
  const taxaConversao = taxasConversao[criptoSelecionada].brl;
  const userLogado = JSON.parse(localStorage.getItem('userLogado'));

  if (userLogado) {
    const saldoMaximo = userLogado.saldo / taxaConversao;
    quantidadeInput.max = saldoMaximo;
    quantidadeInput.value = '';
    atualizarSaldoNecessario();
  }
}

function atualizarSaldo() {
  const userLogado = JSON.parse(localStorage.getItem('userLogado'));

  if (userLogado) {
    saldoElement.innerHTML = `<h4>${formatarSaldo(userLogado.saldo)}`;
  } else {
    saldoElement.textContent = '';
  }
}

function atualizarSaldoNecessario() {
  const quantidade = parseFloat(quantidadeInput.value);
  const criptoSelecionada = criptoSelect.value;
  const taxaConversao = taxasConversao[criptoSelecionada].brl;
  const userLogado = JSON.parse(localStorage.getItem('userLogado'));

  if (userLogado) {
    const saldoMaximo = userLogado.saldo / taxaConversao;

    if (!isNaN(quantidade)) {
      const saldoNecessario = quantidade * taxaConversao;

      if (saldoNecessario <= userLogado.saldo) {
        saldoNecessarioElement.textContent = `${formatarSaldo(saldoNecessario)}`;
      } else {
        saldoNecessarioElement.textContent = `${formatarSaldo(saldoNecessario)}`;
      }
    } else {
      saldoNecessarioElement.textContent = '';
    }
  }
}

atualizarSaldo();
atualizarTaxasConversaoPeriodicamente();

trocarBtn.addEventListener('click', trocarPorCripto);
criptoSelect.addEventListener('change', atualizarQuantidadeMaxima);
quantidadeInput.addEventListener('input', atualizarSaldoNecessario);

// Estilos CSS para o alerta
const estilosAlerta = `
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

// Adiciona os estilos ao head do documento
const style = document.createElement('style');
style.innerHTML = estilosAlerta;
document.head.appendChild(style);



