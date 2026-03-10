const db = require('../util/database')

module.exports = class Song {
    static fetchAll() {
        return db.execute('SELECT * FROM songs');
    }

    static findById(id) {
        return db.execute(`
            SELECT songs.*, genres.name AS genre_name
            FROM songs
            JOIN genres ON songs.genre_id = genres.genre_id
            WHERE songs.song_id = ?
        `, [id]);
    }
}