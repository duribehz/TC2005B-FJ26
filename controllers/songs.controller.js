const fs = require('fs');
const path = require('path');
const router = require('../routes/songs.routes');

const archivoDatos = path.join(__dirname, 'songs.txt');

function leerMusica() {
    try {
        if (!fs.existsSync(archivoDatos)) return [];
        const contenido = fs.readFileSync(archivoDatos, 'utf-8');
        return contenido.split('\n').filter(line => line.trim() !== '');
    } catch (err) {
        return [];
    }
}

exports.get_lista = (req, res) => {
    const lista = leerMusica();
    res.render('list', { 
        página: 'Mi Playlist',
        canciones: lista 
    });
}

exports.get_new = (req, res) => {
    res.render('new', {
        página: 'Registrar Canción',
        detalles: false,
        agradecimiento: false,
        error: false
    });
}


exports.post_new = (req, res) => {
    const titulo = req.body.titulo;
    if (titulo) {
        fs.appendFileSync(archivoDatos, titulo + '\n');
        res.redirect('/musica/gracias');
    } else {
        res.redirect('/musica/new');
    }
}

exports.get_detalle = (req, res) => {
    const lista = leerMusica();
    const cancion = lista[req.params.index];
    res.render('new', {
        página: cancion ? `Canción: ${cancion}` : 'No encontrada',
        detalles: true,
        agradecimiento: false,
        error: !cancion
    });
}  

exports.get_gracias = (req, res) => {
    res.render('new', {
        página: '¡Guardado con éxito!',
        agradecimiento: true,
        detalles: false,
        error: false
    });
}