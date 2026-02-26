const express = require ('express');
const bodyParser = require ('body-parser');
const routes_songs = require ('./routes/songs.routes.js');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));


app.use('/songs', routes_songs);
app.use ((req, res, next) => {
    res.status(404).send("La ruta no existe");
});

app.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000");
});



