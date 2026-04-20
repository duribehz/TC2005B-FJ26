const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const session = require('express-session');
const csrf = require('csurf');
const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (request, file, callback) => {
        callback(null, new Date().getMilliseconds() + '-' + file.originalname);
    },
});

app.use(multer({ storage: fileStorage }).single('imagen')); 



app.set('view engine', 'ejs');
app.set('views', 'views'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
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

app.use((req, res, next) => {
    console.log('Método:', req.method, '| URL:', req.url);
    next();
});

const routesUser = require('./routes/user.routes')
app.use('/user', routesUser);

const routesSong = require('./routes/song.routes');
app.use('/song', routesSong);

app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.statusCode || 500).render('error', {
        pagina: 'Error',
        error: true,
        message: error.message,
    });
});

app.use((request, response) => {
    response.status(404).render('error', {
        pagina: 'Error 404 - Ruta no encontrada',
        detalles: false,
        error: true,
        message: 'Ruta no encontrada'
    });
});


// app.use((request, response) => 
//     { response.status(404).render('error', { pagina: 'Error 404 - Ruta no encontrada', error: true message: '${message}', }); });

app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000/user/login");
});

