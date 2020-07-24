const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const contactRouter = require('./routes/contactRouter');

const hostname = 'localhost';
const port = 3000;

const app = express(); // returns an express server application

app.use(morgan('dev')); // logs request info
app.use(bodyParser.json());

app.use('/contacts', contactRouter); // provide root path of contactRouter here

// set up express to serve static files
// std behavior for webserver to serve up the index.html file if send req to hostname
app.use(express.static(__dirname + '/public')); // __dirname = absolute path

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// start listening to server; creates an instance of http server class
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});