document.addEventListener('DOMContentLoaded', function () {
    const authToken = localStorage.getItem('authToken');
    const currentPage = window.location.pathname;

    if (!authToken && currentPage !== '/GuardGroveFrontend/Login.html') {
        window.location.href = '/GuardGroveFrontend/Login.html';
    } else if (authToken && currentPage === '/GuardGroveFrontend/Login.html') {
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
            console.log('Network response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);

            if (data.succeded && data.data) {
                console.log('Login success:', data);

                localStorage.removeItem('authToken');
                localStorage.setItem('authToken', data.data);
                
                try {
                    if (typeof jwt_decode !== 'undefined') {
                        const decodedToken = jwt_decode(data.data);
                        console.log('Token decodificado:', decodedToken);

                        const userId = decodedToken.nameid;
                        console.log('UserId encontrado:', userId);

                        if (userId) {
                            localStorage.setItem('userId', userId);
                            console.log('userId almacenado en localStorage:', userId);
                        } else {
                            console.error('No se pudo encontrar el userId en el token decodificado');
                        }
                    } else {
                        console.error('jwt_decode no está definido');
                    }
                } catch (error) {
                    console.error('Error al decodificar el token:', error);
                }

                window.location.href = '/GuardGroveFrontend/folders.html';
            } else {
                console.error('Login failed:', data.message);
                localStorage.removeItem('authToken');
                alert('Error en el inicio de sesión: ' + (data.message || 'Error desconocido'));
            }
        })
        .catch(error => {
            console.error('Error en el inicio de sesión:', error);
            alert('Error en el inicio de sesión: ' + error.message);
        });
    }
});
