const http = require('http');

const songs = [
    {   
        name: "Good Morning",
        artist: "Kanye West",
        link: "https://open.spotify.com/track/6MXXY2eiWkpDCezVCc0cMH?si=8b677ba34ad143ef", 
    },
    {
        name: "Donde Estas Corazon",
        artist: "Shakira",
        link: "https://open.spotify.com/track/6IGvaQ4aFBjy66TdUurIiA?si=5cceadb7edca4d65",
    },
    {
        name: "vivo si me exiges",
        artist: "LATIN MAFIA",
        link: "https://open.spotify.com/track/1rT3ZQcsqcdjBnR5AcaubL?si=53ea0c58fc884590",
    },
]

const html_form = `
    <h2 class="title is-4">Agregar nueva canción</h2>
    <figure class="image is-128x128 mb-4">
        <img src="https://cdn-icons-png.flaticon.com/512/26/26025.png">
    </figure>

    <form action="/new" method="POST">
        <div class="field">
            <label class="label">Nombre de la canción</label>
            <div class="control">
                <input name="nombre" class="input" type="text" placeholder="Ej: Blinding Lights" required>
            </div>
        </div>

        <div class="field">
            <label class="label">Artista</label>
            <div class="control">
                <input name="artista" class="input" type="text" placeholder="Ej: The Weeknd" required>
            </div>
        </div>

        <div class="field">
            <label class="label">Link de Spotify</label>
            <div class="control">
                <input name="link" class="input" type="text" placeholder="https://open.spotify.com/..." required>
            </div>
        </div>

        <div class="control">
            <button class="button is-primary" type="submit">Guardar canción</button>
        </div>

    </form>
`;

const html_header = `
    <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Playlist</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
            </head>
            <body>
                <section class="section">
                <div class="container">
                <h1 class="title">
                    <a href="/">Playlist</a>
                </h1>
                <p class="subtitle">Agrega tus canciones favoritas</p>
`;

const html_footer = `
    </div>
    </section>
    </body>
    </html>
`;



const server = http.createServer((request, response) => {
    if (request.url === '/' && request.method === "GET") {
        let html_index = `
            <a class="button is-link mb-4" href="/new">Agregar canción</a>
            <div class="columns is-multiline">
        `;

        for (let song of songs){
        html_index +=
            `<div class="column is-one-third">
                <div class="box">
                    <h3 class="title is-5">${song.name}</h3>
                    <p><strong>Artista:</strong> ${song.artist}</p>
                    <a href="${song.link}" target="_blank" class="button is-small is-success mt-2">
                        Escuchar en Spotify
                    </a>
                </div>
            </div>
            `;
        }

        html_index += `<div>`;

        response.setHeader('Content-Type','text/html');
        response.write(html_header + html_index + html_footer);
        response.end();
    }else if (request.url === '/new' && request.method === "GET"){
        response.setHeader('Content-Type','text/html');
        response.write(html_header + html_form + html_footer);
        response.end();
    }else if (request.url === '/new' && request.method === "POST"){
        response.setHeader('Content-Type','text/html');
        const fullData = [];

        request.on('data',(data) => {
            console.log(data);
            fullData.push(data);
        });

        request.on('end',() => {
            const stringFullData = Buffer.concat(fullData).toString();
            console.log(stringFullData);
            songs.push({
                name: stringFullData.split('&')[0].split('=')[1],
                artist: stringFullData.split('&')[1].split('=')[1],
                link: stringFullData.split('&')[2].split('=')[1],
            });
            
            response.end();

        });

    }else{
        response.setHeader('Content-Type','text/html');
        response.write(404);
        response.end();
    }
});

server.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000")
});