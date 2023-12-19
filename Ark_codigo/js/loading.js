window.addEventListener('load', function() {
    setTimeout(function() {
      document.getElementById('loading').style.opacity = 0;
      setTimeout(function() {
        document.getElementById('loading').style.display = 'none';
      }, 300);
    }, 1000);
  });
//   QUANDO A TELA APARECE, CHAMA A DIV DO LOADING
  document.addEventListener('DOMContentLoaded', function() {
    var loadingElement = document.getElementById('loading');
    var spinnerElement = document.querySelector('#loading .spinner');
  
    // Verificar se o modo escuro está definido no localStorage
    var isDarkMode = localStorage.getItem('darkMode') === 'true';
  
    // Definir cor de fundo com base no modo escuro
    loadingElement.style.backgroundColor = isDarkMode ? '#23232a' : 'var(--color-light)';
  
    // Definir cores do spinner com base no modo escuro
    spinnerElement.style.borderLeftColor = isDarkMode ? '#3873ff' : 'var(--color-primary)';
  });
  