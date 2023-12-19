// NAVBAR TOGGLE

const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');
const sideBar = document.querySelector('aside');

// CASO CLIQUE NO BOTÃO, APARECE A SIDEBAR
menuBtn.addEventListener('click', () => {
    sideBar.style.display = 'block';
})
// CLICANDO NOVAMENTE, A SIDEBAR SOME
closeBtn.addEventListener('click', () => {
    sideBar.style.display = 'none';
})