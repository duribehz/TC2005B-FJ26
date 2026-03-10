const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views'); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const rutasMusica = require('./routes/songs.routes');

app.use('/musica', rutasMusica);

app.use((request, response) => {
    response.status(404).render('new', {
        página: 'Error 404 - Ruta no encontrada',
        detalles: false,
        agradecimiento: false,
        error: true
    });
});

app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000/musica");
});