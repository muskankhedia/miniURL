const express = require('express');
const app = express();
const Shorten = require('./short/shortener').Shortener;

const shortURL = new Shorten()

app.get('/', function (req, res) {
  res.send('Please send the url to the route "/urlmini" to shorten the URL')
})

/**
 * Returns the shorten URL
 * Appends the shortened URL with proper indexing in the database
 * Declares the route '/urlmini', recieves the basicURL as request
 *
 */
app.get('/urlmini', function(req, res) {
    var outputURL = shortURL.shortenURL(req.query.query)
    console.log("outputURL:: ", outputURL);
    res.send(outputURL)
})

// Listens the server in PORT 3000
app.listen(3000)