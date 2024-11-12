(function() {
    // Verificar se o objeto metrifiquese foi definido
    if (typeof window.metrifiquese !== 'undefined') {
        var userId = window.metrifiquese.user_id;
        var userName = window.metrifiquese.user_name;

        // Checar se user_id foi fornecido (obrigatório)
        if (!userId) {
            console.error('Erro: user_id é obrigatório.');
            return;
        }

        // Construir a URL do iframe com os parâmetros obrigatórios
        var iframeUrl = 'https://www.metrifiquese.com.br/widget' +
                        '?user_id=' + encodeURIComponent(userId) +
                        '&user_name=' + encodeURIComponent(userName);

        // Criar o iframe e configurá-lo com o prefixo metrifiquese-
        var metrifiqueseIframe = document.createElement('iframe');
        metrifiqueseIframe.src = iframeUrl;

        // Estilos do iframe com o prefixo metrifiquese-
        metrifiqueseIframe.style.display = 'none'; // Ocultar o iframe inicialmente
        metrifiqueseIframe.style.width = '100%';
        metrifiqueseIframe.style.height = '100%';
        metrifiqueseIframe.style.position = 'fixed';
        metrifiqueseIframe.style.top = '0';
        metrifiqueseIframe.style.left = '0';
        metrifiqueseIframe.style.zIndex = '9999';
        metrifiqueseIframe.frameBorder = '0';

        // Adicionar o iframe à página
        document.body.appendChild(metrifiqueseIframe);

        // Função para mostrar o iframe quando o postMessage for recebido
        window.addEventListener('message', function(event) {
                console.log('Mensagem recebida:', event.data);  // Log para verificar a mensagem recebida
            if (event.data.action === 'metrifiquese-showWidget') {
                metrifiqueseIframe.style.display = 'block';  // Exibe o iframe
            } else if (event.data.action === 'metrifiquese-hideWidget') {
                metrifiqueseIframe.style.display = 'none'; // Oculta o iframe
            }
        });

        // Função para checar a URL em que o iframe está
        window.addEventListener('message', function(event) {
            if (event.data.action === 'getHostName') {
                // Responder ao iframe com o hostname da página maior
                event.source.postMessage({ action: 'hostName', hostName: window.location.hostname }, event.origin);
            }
        });

    } else {
        console.error('Erro: objeto metrifiquese não foi definido.');
    }
})();
