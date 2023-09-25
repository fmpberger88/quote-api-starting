const express = require('express');
const {quotes} = require("./data");
const {getRandomElement} = require("./utils");
const { v4: uuidv4} = require('uuid');
const quoteRouter = express.Router();

// Ein GET-Endpoint für alle Benutzer
quoteRouter.get('/', (req, res) => {
    if (req.query.person) {
        const filteredQuotes = quotes.filter(q => q.person.toLowerCase() === req.query.person.toLowerCase());
        if (filteredQuotes.length > 0) {
            res.json( { quotes: filteredQuotes})
        } else {
            res.status(404).json( { message: "No quotes from this person!"})
        }
    } else {
        res.json({quotes});
    }
});

// Ein GET-Endpoint für random quote
quoteRouter.get('/random', (req, res) => {
    const randomQuote = getRandomElement(quotes)
    console.log(randomQuote)
    res.json({quotes: [randomQuote]});
})

// Ein POST-Endpoint zum hinzufügen eines neuen Zitats
quoteRouter.post('/', (req, res) => {
    const newQuote = {
        id: uuidv4(),
        quote: req.body.quote,
        person: req.body.person
    };
    quotes.push(newQuote)
    res.status(201).json(newQuote);
})

// Ein PUT-Endpoint um Quotes zu aktualisieren
quoteRouter.put('/:id', (req, res) => {
    const index = quotes.findIndex(q => q.id === req.params.id);
    if (index !== -1) {
        quotes[index] = {
            id: quotes[index].id, // Behalte die vorhandene ID bei
            ...req.body
        };
        res.json(quotes[index]);
    } else {
        res.status(404).send();
    }
});

// Ein Delete-Endpoint um Quotes zu löschen
quoteRouter.delete('/:id', (req, res) => {
    const index = quotes.findIndex(q => q.id === req.params.id);
    if (index !== -1) {
        const deleted = quotes.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).send();
    }
});


module.exports = quoteRouter;