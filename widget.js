(function() {
    if (typeof window.metrifiquese !== 'undefined') {
        var userId = window.metrifiquese.user_id;
        var userName = window.metrifiquese.user_name;

        if (!userId) {
            console.error('Erro: user_id é obrigatório.');
            return;
        }

        // Construir a URL do iframe com os parâmetros obrigatórios
        var iframeUrl = 'https://www.metrifiquese.com.br/widget' +
                        '?user_id=' + encodeURIComponent(userId) +
                        '&user_name=' + encodeURIComponent(userName);

        // Criar o iframe e configurá-lo
        var metrifiqueseIframe = document.createElement('iframe');
        metrifiqueseIframe.src = iframeUrl;
        metrifiqueseIframe.style.width = '100%';
        metrifiqueseIframe.style.height = '100%';
        metrifiqueseIframe.style.position = 'fixed';
        metrifiqueseIframe.style.top = '0';
        metrifiqueseIframe.style.left = '0';
        metrifiqueseIframe.style.zIndex = '9999';
        metrifiqueseIframe.frameBorder = '0';

        // Adicionar o iframe à página
        document.body.appendChild(metrifiqueseIframe);

        // Exibir e ocultar o iframe conforme necessário
        window.addEventListener('message', function(event) {
            if (event.data.action === 'showWidget') {
                metrifiqueseIframe.style.display = 'block';
            } else if (event.data.action === 'hideWidget') {
                metrifiqueseIframe.style.display = 'none';
            }
        });

    } else {
        console.error('Erro: o objeto metrifiquese não foi definido.');
    }
})();
