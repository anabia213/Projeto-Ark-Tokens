// COLETA O BOTÃO E A LOGO
const themeBtn = document.querySelector('.theme-btn');
const logo = document.querySelector('.logo');

// Verificar se há uma preferência de tema armazenada
// VERIFICA SE O ITEM "theme" JÁ ESTÁ PRESENTE NO localStorage
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  document.body.classList.add(storedTheme);
  themeBtn.querySelector('span:first-child').classList.toggle('active');
  themeBtn.querySelector('span:last-child').classList.toggle('active');
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');

  // Verificar o tema atual e armazenar a preferência no localStorage
  const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : '';
  localStorage.setItem('theme', currentTheme);

  themeBtn.querySelector('span:first-child').classList.toggle('active');
  themeBtn.querySelector('span:last-child').classList.toggle('active');
});
