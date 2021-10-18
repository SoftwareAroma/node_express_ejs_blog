const http = require('http');
const fs = require('fs');
const _ = require('lodash');


const server = http.createServer((request, response) => {

    // lodash 
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hello');
    });

    greet();

    response.setHeader('content-type', 'text/html'); // set headers

    let path = 'public/'; // base directory (public)
    switch (request.url) {
        case '/':
            path += 'home.html';
            response.statusCode = 200;
            break;
        case '/home':
            path += 'home.html';
            response.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200;
            break;
        case '/about-me':
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        default:
            path += '404.html';
            response.statusCode = 404;
            break;
    }
    fs.readFile(path, (error, data) => {
        if (error) {
            console.log("There was an error reading the specified file", error);
            response.end();
        } else {
            // response.write(data);
            response.end(data); // works the same way as adding the line above and removing the data in the end clause
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log("listening on port ", server.address().port);
});