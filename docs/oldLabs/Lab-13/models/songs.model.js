const fs = require('fs');
const path = require('path');

const archivoDatos = path.join(__dirname, 'songs.txt');

exports.leerMusica = () => {
    try {
        if (!fs.existsSync(archivoDatos)) return [];
        const contenido = fs.readFileSync(archivoDatos, 'utf-8');
        return contenido.split('\n').filter(line => line.trim() !== '');
    } catch (err) {
        return [];
    }
}

exports.guardarSong = (titulo) => { 
    fs.appendFileSync(archivoDatos, titulo + '\n');
}