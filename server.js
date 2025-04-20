const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia esto por tu contraseña
    database: 'pedidos_express'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar con MySQL:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Registro de usuario
app.post('/register', async (req, res) => {
    const { correo, username, nombre, apellidos, telefono, sexo, password } = req.body;

    if (!correo || !username || !nombre || !apellidos || !sexo || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    db.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al verificar usuario' });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO usuarios (correo, username, nombre, apellidos, telefono, sexo, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [correo, username, nombre, apellidos, telefono, sexo, hashedPassword],
            (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Error al registrar usuario' });
                }
                res.json({ message: 'Usuario registrado exitosamente!' });
            }
        );
    });
});

// Login de usuario
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    db.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];
        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
            res.json({ message: 'Login exitoso!' });
        } else {
            res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    });
});

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));