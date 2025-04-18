async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    document.getElementById('message').innerText = data.message;
    if (res.ok) {
        document.getElementById('message').classList.remove('text-danger');
        document.getElementById('message').classList.add('text-success');
    } else {
        document.getElementById('message').classList.remove('text-success');
        document.getElementById('message').classList.add('text-danger');
    }
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    document.getElementById('message').innerText = data.message;
    if (res.ok) {
        document.getElementById('message').classList.remove('text-danger');
        document.getElementById('message').classList.add('text-success');
    } else {
        document.getElementById('message').classList.remove('text-success');
        document.getElementById('message').classList.add('text-danger');
    }
}