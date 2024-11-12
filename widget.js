(function() {
    // Verifica se o objeto metrifiquese está definido
    if (typeof metrifiquese !== 'undefined') {
        var appId = metrifiquese.app_id;
        var userId = metrifiquese.user_id;

        // Verifica se app_id e user_id foram fornecidos
        if (!appId) {
            console.error('Erro: app_id é obrigatório.');
            return;
        }

        if (!userId) {
            console.error('Erro: user_id é obrigatório.');
            return;
        }

        // Construir a URL do iframe com os parâmetros obrigatórios
        var iframeUrl = 'https://www.metrifiquese.com.br/widget' + 
                        '?app_id=' + encodeURIComponent(appId) +
                        '&user_id=' + encodeURIComponent(userId);

        // Adiciona parâmetro opcional do nome do usuário, se definido
        if (metrifiquese.user_name) {
            iframeUrl += '&user_name=' + encodeURIComponent(metrifiquese.user_name);
        }

        // Cria o iframe e configura os estilos
        var metrifiqueseIframe = document.createElement('iframe');
        metrifiqueseIframe.src = iframeUrl;
        metrifiqueseIframe.style.width = '100%';
        metrifiqueseIframe.style.height = '100%';
        metrifiqueseIframe.style.position = 'fixed';
        metrifiqueseIframe.style.top = '0';
        metrifiqueseIframe.style.left = '0';
        metrifiqueseIframe.style.zIndex = '9999';
        metrifiqueseIframe.frameBorder = '0';
        metrifiqueseIframe.allowFullscreen = true;
        metrifiqueseIframe.style.display = 'none';

        // Adiciona o iframe ao corpo da página
        document.body.appendChild(metrifiqueseIframe);

        // Escuta mensagens para mostrar ou ocultar o iframe
        window.addEventListener('message', function(event) {
            if (event.data.action === 'showMetrifiqueseWidget') {
                metrifiqueseIframe.style.display = 'block';
            } else if (event.data.action === 'hideMetrifiqueseWidget') {
                metrifiqueseIframe.style.display = 'none';
            }
        });
    } else {
        console.error('Erro: objeto metrifiquese não foi definido.');
    }
})();
