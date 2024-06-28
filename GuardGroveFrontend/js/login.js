document.addEventListener('DOMContentLoaded', function () {
    const authToken = localStorage.getItem('authToken');
    const currentPage = window.location.pathname;

    if (!authToken && currentPage !== '/GuardGroveFrontend/Login.html') {
        // Redirigir al login si no hay token y no estamos en la página de login
        window.location.href = '/GuardGroveFrontend/Login.html';
    } else if (authToken && currentPage === '/GuardGroveFrontend/Login.html') {
        // Redirigir a folders.html si hay token y estamos en la página de login
        window.location.href = '/GuardGroveFrontend/folders.html';
    }

    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email && password) {
            login(email, password);
        }
    });

    function login(email, password) {
        fetch('http://localhost:5133/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        })
        .then(response => {
            console.log('Network response status:', response.status); // Agregado para depuración
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data); // Agregado para depuración
            if (data.succeded && data.data) {
                console.log('Login success:', data);
                // Limpiar cualquier token antiguo del almacenamiento local (opcional)
                localStorage.removeItem('authToken');
                // Almacenar el nuevo token en el almacenamiento local
                localStorage.setItem('authToken', data.data);
                // Redirigir a la página de carpetas
                window.location.href = '/GuardGroveFrontend/folders.html';
            } else {
                console.error('Login failed:', data.message);
                // Limpiar cualquier token antiguo del almacenamiento local (en caso de error)
                localStorage.removeItem('authToken');
                // Mostrar mensaje de error al usuario
                alert('Error en el inicio de sesión: ' + (data.message || 'Error desconocido'));
            }
        })
        .catch(error => {
            console.error('Error en el inicio de sesión:', error);
            alert('Error en el inicio de sesión: ' + error.message);
        });
    }
});
