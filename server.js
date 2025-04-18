const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

let users = [];

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: 'Usuario registrado exitosamente!' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) res.json({ message: 'Login exitoso!' });
    else res.status(401).json({ message: 'Contraseña incorrecta' });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));