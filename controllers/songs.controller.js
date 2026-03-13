
const Song = require('../models/songs.model')
const Genre = require('../models/genre.model');

exports.get_list = (req, res, next) => {
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

exports.get_new = (req, res, next) => {
Genre.fetchAll().then(([rows, fieldData]) => {
    console.log(rows)
    return res.render ('form',
        {
            pagina: 'Agregar canciones',
            genres: rows
        });
}).catch ((error) => {
    next(error);
    console.log(error);
});
}

exports.post_new = (req, res) => {    
    const song = new Song(
        req.body.title,
        req.body.artist,
        req.body.link,
        req.body.genre_id
    )
    song.save().then(() => {
        return res.redirect('/song/thanks');
    }).catch((error) => {
        next(error);
        console.log(error);
    })
}

exports.get_detail = (req, res, next) => {
    const id = (req.params.id);
    console.log(req.params);
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

exports.get_thanks = (req, res) => {
    res.render('new', {
        pagina: '¡Guardado con éxito!',
        agradecimiento: true,
        detalles: false,
        error: false
    });
}