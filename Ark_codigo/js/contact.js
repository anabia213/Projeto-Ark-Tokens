window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // these IDs from the previous steps
        var templateParams = {
            to_name: 'ARK Tokens', // Defina o nome de destino do email
            from_name: document.getElementById('name').value, // Obtém o valor do campo "name"
            message: document.getElementById('message').value // Obtém o valor do campo "message"
        };

        emailjs.send('service_cv0j963', 'template_ye6jm13', templateParams)
            .then(function() {
                console.log('Mensagem enviada com sucesso!');
                // Limpa os campos do formulário
                document.getElementById('contact-form').reset();
                // Exibe um alerta de sucesso
                alert('Mensagem enviada com sucesso! Obrigado por entrar em contato conosco!');
            }, function(error) {
                console.log('FAILED...', error);
                // Exibe um alerta de erro
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.');
            });
    });
}