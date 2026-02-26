const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const songsFile = path.join(__dirname, 'songs.txt');

let songs = [];

if (fs.existsSync(songsFile)) {
    const data = fs.readFileSync(songsFile, 'utf-8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    for (let line of lines) {
        const [name, artist, link] = line.split('|');
        songs.push({ name, artist, link });
    }
}

function saveSong(song) {
    const line = `${song.name}|${song.artist}|${song.link}\n`;
    fs.appendFileSync(songsFile, line);
}

const html_header = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Playlist</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
</head>
<body>
<section class="section">
<div class="container">
<h1 class="title">
<a href="/songs">Playlist</a>
</h1>
<p class="subtitle">Mi aplicación con Express</p>
`;

const html_footer = `
</div>
</section>
</body>
</html>
`;

const html_form = `
<form action="/songs/new" method="POST">

<div class="field">
<label class="label">Nombre</label>
<div class="control">
<input name="nombre" class="input" type="text">
</div>
</div>

<div class="field">
<label class="label">Artista</label>
<div class="control">
<input name="artista" class="input" type="text">
</div>
</div>

<div class="field">
<label class="label">Link</label>
<div class="control">
<input name="link" class="input" type="text">
</div>
</div>

<input class="button is-primary" type="submit" value="Guardar canción">
</form>
`;


router.use((req, res, next) => {
    console.log("Middleware Songs");
    next();
});



router.get('/new', (req, res) => {
    res.send(html_header + html_form + html_footer);
});


router.post('/new', (req, res) => {

    const nuevaCancion = {
        name: req.body.nombre,
        artist: req.body.artista,
        link: req.body.link
    };

    songs.push(nuevaCancion);
    saveSong(nuevaCancion);

    res.send(html_header + `
        <p>Canción guardada correctamente</p>
        <a class="button is-link" href="/songs">Volver</a>
    ` + html_footer);
});


router.get('/song/:id', (req, res) => {

    const id = req.params.id;
    const song = songs[id];

    if (!song) {
        return res.status(404).send("Canción no encontrada");
    }

    let html_detail = `
        <h2 class="title">${song.name}</h2>
        <p><strong>Artista:</strong> ${song.artist}</p>
        <a class="button is-success" href="${song.link}" target="_blank">Escuchar</a>
        <br><br>
        <a class="button is-light" href="/songs">Volver</a>
    `;

    res.send(html_header + html_detail + html_footer);
});


router.get('/artists', (req, res) => {

    let artistasUnicos = [...new Set(songs.map(song => song.artist))];

    let html_artists = `
        <h2 class="title">Lista de Artistas</h2>
        <ul>
    `;

    for (let artista of artistasUnicos) {
        html_artists += `<li>${artista}</li>`;
    }

    html_artists += `
        </ul>
        <br>
        <a class="button is-light" href="/songs">Volver</a>
    `;

    res.send(html_header + html_artists + html_footer);
});


router.use((req, res) => {

    let html_index = `
        <a class="button is-primary" href="/songs/new">Nueva canción</a>
        <a class="button is-warning" href="/songs/artists">Ver artistas</a>
        <div class="columns is-multiline">
    `;

    songs.forEach((song, index) => {
        html_index += `
            <div class="column is-one-third">
                <div class="box">
                    <strong>${song.name}</strong>
                    <p>${song.artist}</p>
                    <a class="button is-small is-info" href="/songs/song/${index}">
                        Ver info
                    </a>
                </div>
            </div>
        `;
    });

    html_index += `</div>`;

    res.send(html_header + html_index + html_footer);
});

module.exports = router;