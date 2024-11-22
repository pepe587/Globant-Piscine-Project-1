

document.addEventListener('DOMContentLoaded', function() {

    const div_code = document.getElementById('auth_code');
    const queryParams = new URLSearchParams(window.location.search);
    let code = queryParams.get('code');;

    div_code.textContent = code;
    console.log(code);
    if (window.opener) {
        // Envía el código a la ventana principal
        window.opener.postMessage({ type: 'auth_code', code: code }, '*');
        window.close(); // Cierra la ventana secundaria
    }
})