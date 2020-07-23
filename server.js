const express = require('express');

const hostname = 'localhost';
const port = 3000;

const app = express(); // returns an express server application

app.use((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// start listening to server; creates an instance of http server class
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});