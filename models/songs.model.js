const db = require('../util/database')

module.exports = class Song {
    static fetchAll() {
        return db.execute('SELECT * FROM songs');
    }
}