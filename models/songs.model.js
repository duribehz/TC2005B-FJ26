const db = require('../util/database')

module.exports = class Song {
    constructor(title, artist, link, genre_id, image){
        this.title = title;
        this.artist = artist;
        this.link = link;
        this.genre_id = genre_id;
        this.image = image;
    }

    save() {
    return db.getConnection().then(async (conn) => {
        try {
        await conn.beginTransaction();

        const [genre] = await conn.execute(
            'SELECT genre_id FROM genre WHERE genre_id = ?',
            [this.genre_id]
        );

        if (genre[0].length === 0) {
            throw new Error('El género no existe');
        }

        await conn.execute('CALL sp_insert_song(?, ?, ?, ?, ?)',
            [this.title, this.artist, this.link, this.genre_id, this.image]
        );

        await conn.commit();
        } catch (err) {
        await conn.rollback();
        throw err;
        } finally {
        conn.release();
        }
    });
}

    static fetchAll() {
        return db.execute('SELECT * FROM song');
    }

    static findById(id) {
        return db.execute(`
            SELECT song.*, genre.name AS genre_name
            FROM song
            JOIN genre ON song.genre_id = genre.genre_id
            WHERE song.song_id = ?
        `, [id]);
    }

    static update(title, artist, link, genre_id, id, image) {
        return db.execute(
            `UPDATE song SET title=?, artist=?, link=?, genre_id=? WHERE song_id=?`,
            [title, artist, link, genre_id, id]
        );
    }

    static delete(id) {
        return db.execute(
            `DELETE FROM song WHERE song.song_id = ? `
            , [id]);
    }
}