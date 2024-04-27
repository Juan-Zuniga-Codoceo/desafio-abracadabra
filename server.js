const express = require('express');
const path = require('path');

const app = express();


const usuarios = ['Juan', 'Camila', 'Natalia', 'Karla', 'Mia'];


const validarUsuario = (req, res, next) => {
    const usuario = req.params.usuario;
    if (usuarios.includes(usuario)) {
      next();
    } else {
      res.sendFile(path.join(__dirname, 'assets', 'who.jpeg'));
    }
  };
  
 
  app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
  });
  

  app.get('/abracadabra/juego/:usuario', validarUsuario, (req, res) => {
    res.redirect('/');
  });


app.get('/abracadabra/conejo/:n', (req, res) => {
  const numero = parseInt(req.params.n);
  const numeroAleatorio = Math.floor(Math.random() * 4) + 1;

  if (numero === numeroAleatorio) {
    res.sendFile(path.join(__dirname, 'assets', 'conejito.jpg'));
  } else {
    res.sendFile(path.join(__dirname, 'assets', 'voldemort.jpg'));
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.use('*', (req, res) => {
  res.status(404).send('Esta página no existe...');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
