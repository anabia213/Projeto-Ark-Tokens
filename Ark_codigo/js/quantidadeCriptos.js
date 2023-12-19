function formatarQuantidadeBitcoin(quantidade) {
    if (quantidade >= 1000) {
      return formatarNumeroAbreviado(quantidade);
    }
    return quantidade.toFixed(2); // Define 2 casas decimais
  }
  
  function exibirQuantidadeBitcoin() {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    if (userLogado && userLogado.hasOwnProperty('bitcoin')) {
      const quantidadeBitcoin = userLogado.bitcoin;
      const quantidadeBitcoinElement = document.querySelector('#quantidadeBitcoin');
      quantidadeBitcoinElement.innerHTML = formatarQuantidadeBitcoin(quantidadeBitcoin);
    }
  }
  
  // Chamar a função para exibir a quantidade de bitcoins ao carregar a página
  window.addEventListener('DOMContentLoaded', exibirQuantidadeBitcoin);