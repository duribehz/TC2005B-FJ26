const db = require('../util/database');
const bcrypt = require('bcryptjs');


class User {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }

    static create(name, password) {
        return bcrypt.hash(password, 12)
            .then((hashedPassword) => {
                return db.execute(
                    `INSERT INTO users (name, password) VALUES (?, ?)`,
                    [name, hashedPassword]
                );
            });
    }

    static findByName(name) {
    return db.execute(
        `SELECT * FROM users WHERE name = ?`,
        [name]
    );
}
}

module.exports = User;