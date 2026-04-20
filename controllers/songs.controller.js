
const Song = require('../models/songs.model')
const Genre = require('../models/genre.model');

exports.get_list = (req, res, next) => {
    Song.fetchAll().then(([rows]) => {
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
    return res.render ('form-new',
        {
            pagina: 'Agregar canciones',
            genres: rows
        });
}).catch ((error) => {
    next(error);
    console.log(error);
});
}

exports.post_new = (req, res, next) => {    
    const song = new Song(
        req.body.title,
        req.body.artist,
        req.body.link,
        req.body.genre_id,
        req.body.image
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
    Song.findById(id)
    .then(([rows]) => {
        const song = rows[0];
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

exports.get_update = (req, res, next) => {
    const id = (req.params.id);
    Song.findById(id).then(([rows]) => {
        const song = rows[0];
        console.log(rows)
        Genre.fetchAll()
            .then(([genres]) => {
                res.render('form-update', {
                pagina: song.title,
                song: song,
                genres: genres,
                    });
                })
    }
    ).catch((error) => {
        next(error);
        console.log(error);
    })
}

exports.post_update = (req, res, next) => {
    const id = req.params.id;
    const {title, artist, link, genre_id} = req.body;
    Song.update(title, artist, link, genre_id, id)
    .then(() => {
        res.redirect(`/song/detail/${id}`);
    })
    .catch((error) => {
        console.log(error);
        next(error);
    })
}

exports.get_thanks = (req, res, next) => {
    res.render('new', {
        pagina: '¡Guardado con éxito!',
        agradecimiento: true,
        detalles: false,
        error: false
    });
}

exports.get_delete = (req, res, next) => {
    const id = req.params.id;
    Song.findById(id)
    .then(([rows]) => {
        const song = rows[0];
        res.render('delete', {
            song: song,
        });
    }).catch ((error) => {
        console.log(error);
        next(error);
    })
}

exports.delete_song = (req, res, next) => {
    const id  = req.params.id;
    Song.delete(id).then(() => {
        res.redirect('/song/list');
    }  
    ).catch ((error) => {
        console.log(error);
        next(error);
    })
}