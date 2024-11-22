
function LogIn(){
    const clientId = 'nT83cka0A1WnUVTBcLxNrns3n4MiguXtDNoTgMqDhug';
    const redirectUri = 'http://localhost:5500/ex00/callback/';  // Asegúrate de que esta URL esté registrada correctamente
    const clientSecret = 'eHvOJYppqeIbIQVtt8RQ5AGBFrT1HLr7HfF0wgphGx4';
    // Crear la URL de autorización
    const authorizationUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=public`;

    // Abrir la URL en una nueva ventana
    window.open(authorizationUrl, '_blank');
    let strcode;
    

    document.getElementById('submitLogin').remove();
    const eventL = window.addEventListener('message', function(event) {
        // Valida que el mensaje proviene de la ventana esperada
        if (event.data.type === 'auth_code') {
            strcode = event.data.code;
        }
        window.removeEventListener('message', eventL);
        const data = {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: strcode,
            grant_type: 'authorization_code'
        };
    
        fetch('https://unsplash.com/oauth/token', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok)
            {
                document.getElementById('MainInstance').style.display = 'block';
                document.getElementById('loginScreen').style.display = 'none';
            }
            else
                console.error('API FAILED');  
        })
        .then(tokenData => {
            if (tokenData !== undefined)
                accessToken = tokenData.access_token;
        })
        .catch(error => console.error('Error:', error));
        console.log(strcode);
    });
}

function handlerKey(event) {

    const input = document.getElementById('input');
    let query;

    if (event.key === 'Enter')
    {
        query = input.value;
        input.value = '';
        fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=5&client_id=nT83cka0A1WnUVTBcLxNrns3n4MiguXtDNoTgMqDhug`, {
            method: 'GET'
        })
        .then(data => {
            console.log(data);
            let nraw = data.indexOf('raw');
        });
    }
}


var accessToken;

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const LogInButton = document.getElementById('submitLogin');

    if (input !== null)
        input.addEventListener('keypress', handlerKey);
    if (LogInButton !== null)
        LogInButton.addEventListener('click', LogIn);
});
