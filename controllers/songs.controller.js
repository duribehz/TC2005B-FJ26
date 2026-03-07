
const Song = require('../models/songs.model')

exports.get_lista = (req, res) => {
    const lista = Song.leerMusica();
    res.render('list', { 
        pagina: 'Mi Playlist',
        canciones: lista 
    });
    console.log(req.session.username)
}

exports.get_new = (req, res) => {
    res.render('new', {
        pagina: 'Registrar Canción',
        detalles: false,
        agradecimiento: false,
        error: false
    });
}

exports.post_new = (req, res) => {
    const titulo = req.body.titulo;
    if (titulo) {
        Song.guardarSong(titulo);
        res.redirect('/musica/gracias');
    } else {
        res.redirect('/musica/new');
    }
}

exports.get_detalle = (req, res) => {
    const lista = Song.leerMusica();
    const cancion = lista[req.params.index];
    res.render('new', {
        pagina: cancion ? `Canción: ${cancion}` : 'No encontrada',
        detalles: true,
        agradecimiento: false,
        error: !cancion
    });
}  

exports.get_gracias = (req, res) => {
    res.render('new', {
        pagina: '¡Guardado con éxito!',
        agradecimiento: true,
        detalles: false,
        error: false
    });
}