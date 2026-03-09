const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', 'views'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false,
    saveUninitialized: false,
}));

const rutasUsers = require('./routes/user.routes')
app.use('/user', rutasUsers);

const rutasMusica = require('./routes/songs.routes');
app.use('/musica', rutasMusica);

app.use((request, response) => {
    response.status(404).render('new', {
        pagina: 'Error 404 - Ruta no encontrada',
        detalles: false,
        agradecimiento: false,
        error: true
    });
});

app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000/user/login");
});