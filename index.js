const express = require('express');
const app = express();
const Shorten = require('./short/shortener').Shortener;
const dbManager = require('./utils/db-manager').DBManager;

// Creating a dbManager object
const db = new dbManager();

// Creating a database to store all the URLs
db.createDB('./dbs/URLData')

app.get('/', function (req, res) {
  res.send('Please send the url to the route "/urlmini" to shorten the URL')
})

// Declares the route '/urlmini', recieves the basicURL as request
// Responses the shorten URL
// Appends the shortened URL with proper indexing in the database
app.get('/urlmini', function(req, res) {
    var shortURL = new Shorten(req.query.query)
    var outputURL = shortURL.shortenURL()
    this.data['x'] = { y: outputURL}
    db.pushData('/a', this.data, false)
    res.send(outputURL)
})

// Listens the server in PORT 3000
app.listen(3000)