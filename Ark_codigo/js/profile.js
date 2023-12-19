let userLogado = JSON.parse(localStorage.getItem('userLogado'))

let logado = document.querySelector('#botaoLogado')

if (localStorage.getItem('token') != null) {
    logado.innerHTML = '<a href="dashboard.html" id="minhaConta" class="btn btn-outline">Dashboard</a>'
    let criarConta = document.querySelector('#minhaConta')
    criarConta.remove();
} else {
    logado.innerHTML = '';
}
