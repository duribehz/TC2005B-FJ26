
const Song = require('../models/songs.model')

exports.get_lista = (req, res, next) => {
    Song.fetchAll().then(([rows, fieldData]) => {
        return res.render ('list', 
            {
                pagina: 'Lista de canciones',
                songs: rows,
            });
    }).catch((error) =>{
        next(error)
        console.log(error)
    });
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

exports.get_detalle = (req, res, next) => {
    const id = (req.params.index) + 1;
    console.log('ID recibido:', id);
    Song.findById(id)
    .then(([rows]) => {
        console.log('Rows:', rows); 
        const song = rows[0];
        console.log('Song:', song); 
        res.render('detail', {
            pagina: 'Detalle de cancion',
            song: song,
        });
    })
    .catch((error) => {
            next(error);
            console.log(error);
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