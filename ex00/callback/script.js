document,addEventListener('DOMContentLoaded', function() {
    let code__ = document.getElementById('code');
    if (code__) {
    let strcode = (Math.floor(10000000 + Math.random() * 90000000)).toString();
        code__.textContent = strcode;
    }

    window.opener.postMessage(code__.textContent, 'http://localhost:5500');
});