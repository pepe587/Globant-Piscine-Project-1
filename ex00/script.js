
function LogIn(){
    const clientId = 'cfmZDlCUqmd8HIoGXJlt1nx8Jxs09WRZOllyigla1Vg';
    const redirectUri = 'http://localhost:5500/ex00/callback';  // Asegúrate de que esta URL esté registrada correctamente

    // Crear la URL de autorización
    const authorizationUrl = `https://unsplash.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=public`;

    // Abrir la URL en una nueva ventana
    let oauth = window.open(authorizationUrl, '_blank');
    window.addEventListener('message', function(event) {
        // Asegúrate de que el mensaje provenga del dominio correcto
        if (event.origin === 'http://localhost:5500/ex00/callback/') {
            // Procesa el mensaje recibido
            let code = event.data;  // El valor enviado desde la ventana OAuth
            console.log(code);
        }
    });
    document.getElementById('submitLogin').remove();
    let input = document.getElementById('Ok');
    input.style.display = 'block';

    let listener = input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter')
        {
            console.log('se pulso enter');
            if (strcode === input.value)
            {
                console.log(strcode, ' === ', input.value);
                let mainins = document.getElementById('MainInstance');
                mainins.style.display = 'block';
                input.removeEventListener('keypress' ,listener);
                document.getElementById('loginScreen').style.display = 'none';
            }
            else
            {
                console.log(strcode, ' !== ', input.value);
                input.value = '';
            }
        }
    });
    console.log('hola');
}

function handlerKey(event) {

    const input = document.getElementById('input');

    if (event.key === 'Enter')
        input.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const LogInButton = document.getElementById('submitLogin');

    if (input !== null)
        input.addEventListener('keypress', handlerKey);
    if (LogInButton !== null)
        LogInButton.addEventListener('click', LogIn);
});
