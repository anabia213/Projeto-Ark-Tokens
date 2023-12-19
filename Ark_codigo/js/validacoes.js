// Validação do Cadastro //

// Mensagens de erro e sucesso (Talvez não use)
let msgSucesso = document.querySelector("#Success");
let msgErro = document.querySelector("#Error");

// Coleta de inputs e divs
let cadUsuario = document.querySelector("#cadLogin");
let iconUser = document.querySelector("#iconUser");
let divCadUser = document.querySelector("#UserCadDiv");
let validUser = false;

let cadEmail = document.querySelector("#cadEmail");
let iconEmail = document.querySelector("#iconEmail");
let divCadEmail = document.querySelector("#EmailCadDiv");
let validEmail = false;

let cadNome = document.querySelector("#cadNome");
let iconNome = document.querySelector("#iconNome");
let divCadNome = document.querySelector("#NomeCadDiv")
let validNome = false;

let cadSenha = document.querySelector("#cadSenha");
let iconSenha = document.querySelector("#iconSenha");
let divCadSenha = document.querySelector("#SenhaCadDiv");
let validSenha = false;

let cadSenhaConfirma = document.querySelector("#cadSenhaDois");
let iconSenhaDois = document.querySelector("#iconDois");
let divCadSenhaDois = document.querySelector("#SenhaDoisCadDiv");
let validSenhaDois = false;

// Validações de Cadastro

//Validação de Usuário
cadUsuario.addEventListener('keyup', () => {
    if (cadUsuario.value.length < 3) {
        divCadUser.setAttribute('style', 'color: red');
        divCadUser.innerHTML = 'O usuário deve ter no mínimo três caractéres!';
        cadUsuario.setAttribute('style', 'border-color: red');
        iconUser.setAttribute('style', 'color: red');
        validUser = false;
    } else {
        divCadUser.setAttribute('style', 'color: green');
        divCadUser.innerHTML = '';
        cadUsuario.setAttribute('style', 'border-color: green');
        iconUser.setAttribute('style', 'color: green');
        validUser = true;
    }
})

//Validação de Email
//ReGexzinha
let ev = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

function validate(email) {
    if (!ev.test(email) || email.length < 8) {
        divCadEmail.setAttribute('style', 'color: red');
        divCadEmail.innerHTML = 'Insira um e-mail válido!';
        cadEmail.setAttribute('style', 'border-color: red');
        iconEmail.setAttribute('style', 'color: red');
        validEmail = false;
    } else {
        divCadEmail.innerHTML = '';
        cadEmail.setAttribute('style', 'border-color: green');
        iconEmail.setAttribute('style', 'color: green');
        validEmail = true;
    }
}

//Validação de Nome
cadNome.addEventListener('keyup', () => {
    if (cadNome.value.length <= 13 || /\s\s/.test(cadNome.value)) {
        divCadNome.setAttribute('style', 'color: red');
        divCadNome.innerHTML = 'Insira o nome corretamente!';
        cadNome.setAttribute('style', 'border-color: red')
        iconNome.setAttribute('style', 'color: red');
        validNome = false;
    } else {
        divCadNome.setAttribute('style', 'color: green');
        divCadNome.innerHTML = '';
        cadNome.setAttribute('style', 'border-color: green');
        iconNome.setAttribute('style', 'color: green');
        validNome = true;
    }
})

//Validação de Senha
cadSenha.addEventListener('keyup', () => {
    if (cadSenha.value.length <= 10) {
        divCadSenha.setAttribute('style', 'color: red');
        divCadSenha.innerHTML = 'Sua senha está fraca!';
        cadSenha.setAttribute('style', 'border-color: red');
        iconSenha.setAttribute('style', 'color: red');
        validSenha = false;
    } else {
        divCadSenha.setAttribute('style', 'color: green');
        divCadSenha.innerHTML = '';
        cadSenha.setAttribute('style', 'border-color: green');
        iconSenha.setAttribute('style', 'color: green');
        validSenha = true;
    }
})

//Validação da Confirmação de Senha
cadSenhaConfirma.addEventListener('keyup', () => {
    
    if (cadSenhaConfirma.value != cadSenha.value) {
        divCadSenhaDois.setAttribute('style', 'color: red');
        divCadSenhaDois.innerHTML = 'As senhas devem ser idênticas!';
        cadSenhaConfirma.setAttribute('style', 'border-color: red');
        iconSenhaDois.setAttribute('style', 'color: red');
        validSenhaDois = false;
        
        if (cadSenhaConfirma.value.length <= 10) {
            divCadSenhaDois.setAttribute('style', 'color: red');
            divCadSenhaDois.innerHTML = 'A senha está fraca!';
            cadSenhaConfirma.setAttribute('style', 'border-color: red');
            iconSenhaDois.setAttribute('style', 'color: red');
            validSenhaDois = false;
        }
    } else if (cadSenha.value == cadSenhaConfirma.value && cadSenhaConfirma.value.length >= 11) {
        divCadSenhaDois.setAttribute('style', 'color: green');
        divCadSenhaDois.innerHTML = '';
        cadSenhaConfirma.setAttribute('style', 'border-color: green');
        iconSenhaDois.setAttribute('style', 'color: green');
        validSenhaDois = true;
    }
})

function cadastrar() {
    if (validEmail && validNome && validUser && validSenha && validSenhaDois) {
        let listaUsers = JSON.parse(localStorage.getItem('listaUsers') || '[]');
        listaUsers.push({
            nomeCad: cadNome.value,
            loginCad: cadUsuario.value,
            emailCad: cadEmail.value,
            senhaCad: cadSenha.value,
            saldo: 0
        })
        localStorage.setItem('listaUsers', JSON.stringify(listaUsers));
        msgErro.setAttribute('style', 'display: none');

        msgSucesso.setAttribute('style', 'display: block');
        msgSucesso.setAttribute('style', 'color: green');
        msgSucesso.innerHTML = 'Sucesso! Você será redirecionado...';

        setTimeout(() => {
            window.location.assign("auth.html");
        }, 3000)
    } else {
        msgSucesso.setAttribute('style', 'display: none');

        msgErro.setAttribute('style', 'display: block');
        msgErro.setAttribute('style', 'color: red');
        msgErro.innerHTML = 'Não foi possível completar o cadastro!'
    }
}

//Coleta de inputs e divs do Login
function entrar() {

    var loginEmail = document.querySelector("#loginEmail");
    var divLoginEmail = document.querySelector("#loginEmailDiv");
    var iconLoginEmail = document.querySelector("#iconLoginEmail");
    
    var loginSenha = document.querySelector("#loginSenha");
    var divLoginSenha = document.querySelector("#loginSenhaDiv");
    var iconLoginSenha = document.querySelector("#iconLoginSenha");
    
    var msgErroL = document.querySelector("#msgErroLogin");
    var msgSucessoL = document.querySelector("#msgSucessoLogin");

    var listaUsers = []

    var userValid = []

    listaUsers = JSON.parse(localStorage.getItem('listaUsers'));
    listaUsers.forEach((item) => {
        if (loginEmail.value == item.emailCad && loginSenha.value == item.senhaCad) { 
            userValid = {
                emailCad: item.emailCad,
                senhaCad: item.senhaCad,
                loginCad: item.loginCad,
                saldo: item.saldo
            }
        }
    })

    if (loginEmail.value == userValid.emailCad && loginSenha.value == userValid.senhaCad) {
        var token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);

        localStorage.setItem('token', token);
        localStorage.setItem('userLogado', JSON.stringify(userValid));

        msgErroL.setAttribute('style', 'display: none');

        msgSucessoL.setAttribute('style', 'display: block');
        msgSucessoL.setAttribute('style', 'color: green');
        msgSucessoL.innerHTML = 'Sucesso ao logar!';
        loginEmail.setAttribute('style', 'border-color: green');
        loginSenha.setAttribute('style', 'border-color: green');
        iconLoginEmail.setAttribute('style', 'color: green');
        iconLoginSenha.setAttribute('style', 'color: green');

        setTimeout(() => {
            window.location.assign("/index.html")
        }, 1000)

    } else {
        loginEmail.setAttribute('style', 'border-color: red');
        loginSenha.setAttribute('style', 'border-color: red');
        iconLoginEmail.setAttribute('style', 'color: red');
        iconLoginSenha.setAttribute('style', 'color: red');

        msgErroL.setAttribute('style', 'display: block');
        msgErroL.setAttribute('style', 'color: red');
        msgErroL.innerHTML = 'Email ou senha incorretos!';
        loginEmail.focus()
    }
}






