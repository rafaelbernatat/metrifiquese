(function() {
    if (typeof window.metrifiquese !== 'undefined') {
        var userId = window.metrifiquese.user_id;
        var userName = window.metrifiquese.user_name;

        if (!userId) {
            console.error('Erro: user_id é obrigatório.');
            return;
        }

        var iframeUrl = 'https://www.metrifiquese.com.br/widget' +
                        '?user_id=' + encodeURIComponent(userId) +
                        '&user_name=' + encodeURIComponent(userName);

        var metrifiqueseIframe = document.createElement('iframe');
        metrifiqueseIframe.src = iframeUrl;
        metrifiqueseIframe.style.display = 'none';
        metrifiqueseIframe.style.width = '100%';
        metrifiqueseIframe.style.height = '100%';
        metrifiqueseIframe.style.position = 'fixed';
        metrifiqueseIframe.style.top = '0';
        metrifiqueseIframe.style.left = '0';
        metrifiqueseIframe.style.zIndex = '9999';
        metrifiqueseIframe.frameBorder = '0';

        document.body.appendChild(metrifiqueseIframe);

        window.addEventListener('message', function(event) {
            console.log('Mensagem recebida:', event.data);  // Log para verificar a mensagem recebida
            if (event.data.action === 'metrifiquese-showWidget') {
                metrifiqueseIframe.style.display = 'block';
            } else if (event.data.action === 'metrifiquese-hideWidget') {
                metrifiqueseIframe.style.display = 'none';
            }
        });

    } else {
        console.error('Erro: objeto metrifiquese não foi definido.');
    }
})();
