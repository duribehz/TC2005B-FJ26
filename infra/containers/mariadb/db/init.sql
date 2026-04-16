CREATE DATABASE IF NOT EXISTS TC2005B;
USE TC2005B;

CREATE TABLE IF NOT EXISTS genre (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS song (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    link VARCHAR(500),
    genre_id INT NOT NULL,
    FOREIGN KEY (genre_id) REFERENCES genre(genre_id)
);

-- Géneros de ejemplo
INSERT INTO genre (name) VALUES
    ('Rock'),
    ('Pop'),
    ('Jazz'),
    ('Clásica'),
    ('Hip-Hop'),
    ('Electrónica'),
    ('Reggaeton'),
    ('Metal');

INSERT INTO user (name, password, role) VALUES (
    'admin',
    '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'admin'
);

INSERT INTO song (title, artist, link, genre_id) VALUES
    ('Bohemian Rhapsody', 'Queen', 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ', 1),
    ('Blinding Lights', 'The Weeknd', 'https://www.youtube.com/watch?v=4NRXx6U8ABQ', 2),
    ('God\'s Plan', 'Drake', 'https://www.youtube.com/watch?v=xpVfcZ0ZcFM', 5);