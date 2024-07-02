document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email && password) {
            register(email, password);
        }
    });
});

function register(email, password) {
    fetch('http://localhost:5133/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Email: email,
            Password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        if (data.succeded) {
            alert('Registro exitoso. Por favor, inicia sesión.');
            window.location.href = '/Login.html';
        } else {
            console.error('Registro fallido:', data.message);
            alert('Error en el registro: ' + (data.message || 'Error desconocido'));
        }
    })
    .catch(error => {
        console.error('Error en el registro:', error);
        alert('Error en el registro: ' + error.message);
    });
}
