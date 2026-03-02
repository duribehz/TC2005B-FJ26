const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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

router.get('/lista', (req, res) => {
    const lista = leerMusica();
    res.render('list', { 
        página: 'Mi Playlist',
        canciones: lista 
    });
});

router.get('/new', (req, res) => {
    res.render('new', {
        página: 'Registrar Canción',
        detalles: false,
        agradecimiento: false,
        error: false
    });
});

router.post('/new', (req, res) => {
    const titulo = req.body.titulo;
    if (titulo) {
        fs.appendFileSync(archivoDatos, titulo + '\n');
        res.redirect('/musica/gracias');
    } else {
        res.redirect('/musica/new');
    }
});

router.get('/detalle/:index', (req, res) => {
    const lista = leerMusica();
    const cancion = lista[req.params.index];
    res.render('new', {
        página: cancion ? `Canción: ${cancion}` : 'No encontrada',
        detalles: true,
        agradecimiento: false,
        error: !cancion
    });
});

router.get('/gracias', (req, res) => {
    res.render('new', {
        página: '¡Guardado con éxito!',
        agradecimiento: true,
        detalles: false,
        error: false
    });
});

module.exports = router;