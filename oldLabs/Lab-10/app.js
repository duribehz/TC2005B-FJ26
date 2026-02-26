const http = require('http');

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
        response.setHeader('Content-Type','text/html');
        response.write(html_header + html_index + html_footer);
        response.end();
    }
    else{
        response.setHeader('Content-Type','text/html');
        response.write(404);
        response.end();
    }
});

server.listen(4000, () => {
    console.log("Servidor corriendo en http://localhost:4000")
});