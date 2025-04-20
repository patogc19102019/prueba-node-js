// Función para iniciar sesión
async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message');

    if (!username || !password) {
        messageElement.innerText = 'Todos los campos son obligatorios';
        messageElement.classList.add('text-danger');
        return;
    }

    try {
        const res = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        messageElement.innerText = data.message;

        if (res.ok) {
            localStorage.setItem('username', username); // Guardar el nombre de usuario
            window.location.href = '/index.html'; // Redirigir al index
        } else {
            messageElement.classList.remove('text-success');
            messageElement.classList.add('text-danger');
        }
    } catch (error) {
        messageElement.innerText = 'Error de conexión con el servidor';
        messageElement.classList.add('text-danger');
    }
}

// Función para registrarse
async function register() {
    const correo = document.getElementById('correo').value.trim();
    const username = document.getElementById('username').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const sexo = document.getElementById('sexo').value;
    const password = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message');

    if (!correo || !username || !nombre || !apellidos || !sexo || !password) {
        messageElement.innerText = 'Todos los campos son obligatorios';
        messageElement.classList.add('text-danger');
        return;
    }

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, username, nombre, apellidos, telefono, sexo, password })
        });

        const data = await res.json();
        messageElement.innerText = data.message;

        if (res.ok) {
            messageElement.classList.remove('text-danger');
            messageElement.classList.add('text-success');
        } else {
            messageElement.classList.remove('text-success');
            messageElement.classList.add('text-danger');
        }
    } catch (error) {
        messageElement.innerText = 'Error de conexión con el servidor';
        messageElement.classList.add('text-danger');
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('username'); // Eliminar el nombre de usuario
    window.location.href = '/index.html'; // Redirigir al index
}

// Función para redirigir al formulario de registro
function redirectToRegister() {
    window.location.href = '/register.html';
}