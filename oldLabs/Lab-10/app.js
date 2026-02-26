const http = require('http');

const server = http.createServer((request, response) => {
    if (request.url === '/') {
        let html_index = `
            <h1>Hello World!!</h1>
        `;
        response.setHeader('Content-Type','text/html');
        response.write(html_index);
        response.end();
    }
    else{
        response.setHeader('Content-Type','text/html');
        response.write(404);
        response.end();
    }
});

server.listen(4000);