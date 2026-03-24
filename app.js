const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const session = require('express-session');
const csrf = require('csurf');

app.set('view engine', 'ejs');
app.set('views', 'views'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false,
    saveUninitialized: false,
}));

const csrfProtection = csrf();
app.use(csrfProtection); 
app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
});

const routesUser = require('./routes/user.routes')
app.use('/user', routesUser);

const routesSong = require('./routes/song.routes');
app.use('/song', routesSong);

app.use((error, request, response, next) => {
    response.status(500).send(`Error interno del servidor: ${error.stack}`);
});

app.use((request, response) => {
    response.status(404).render('error', {
        pagina: 'Error 404 - Ruta no encontrada',
        error: true
    });
});


app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000/user/login");
});

