const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express(); // returns an express server application

app.use(morgan('dev')); // logs request info
app.use(bodyParser.json());

app.all('/contacts', (req, res, next) => {  // catch all routing for all http verbs
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next(); // passes control to next relevant routing method
}) 

// routing methods for all contacts
app.get('/contacts', (req, res) => { // don't need to pass a next because we will not pass any more fxn
    res.end('Will send all the contacts to you');
});

app.post('/contacts', (req, res) => {  // assumes data is in json format
    console.log(req.body);
    res.end(`Will add the contact: ${req.body.firstname} ${req.body.lastname} with the following information: 
        Phone number: (${req.body.phonenumber.areacode}) ${req.body.phonenumber.phone}; Mobile: ${req.body.mobile}`);
});

app.put('/contacts', (req, res) => {
    res.statusCode = 403; // forbidden
    res.end('PUT operation not supported on /contacts');
});

app.delete('/contacts', (req, res) => {
    res.end('Deleting all contacts');
});

// Routing methods for individual contact
app.get('/contacts/:contactId', (req, res) => { 
    res.end(`Will send details of contact: ${req.params.contactId} to you`);
});

app.post('/contacts/:contactId', (req, res) => {  
    res.statusCode = 403;
    res.end(`POST operation not supported on /contacts/${req.params.contactId}`);
});

app.put('/contacts/:contactId', (req, res) => {
    res.write(`Updating the contact: ${req.params.contactId}\n`);
    res.end(`Will update the contact: ${req.body.firstname} ${req.body.lastname} with 
        the following information: Phone number: (${req.body.phonenumber.areacode}) ${req.body.phonenumber.phone}; 
        Mobile: ${req.body.mobile}`);
});

app.delete('/contacts/:contactId', (req, res) => {
    res.end(`Deleting contact: ${req.params.contactId}`);
});

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