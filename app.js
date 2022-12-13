const express = require('express');
const app = express();
const port = 3000;
const { Sequelize } = require('sequelize');
const Book = require('./src/service/book')
const Library = require('./src/service/library')
const db = require('../models');

const sequelize = new Sequelize('postgres://:@localhost:5432/dbname') // Example for postgres

app.post('/rent', rentBooks);
app.post('/return', returnBooks);
app.post('/addBooks', createBookEntry);

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`);
})

function rentBooks(req, res) {
    // payload = {
    //     user: {
    //         name: 'shubham',
    //         email: '',
    //         contact: '',
    //     },
    //     books: [
    //         {
    //             name: 'Kite Runner',
    //             quantity: 2,
    //         }
    //     ]
    // }
    const library = new Library(db)
    library.login_user(req.body)
    library.rent_books(req.body)
    res.send(`Order Successful`);
}

function returnBooks(req, res) {
    // payload same as above
    const library = new Library(db)
    library.login_user(req.body)
    const rent = library.return_books(req.body)
    res.send(`Your total rent is ${rent}`);
}

function createBookEntry(req, res) {
    // payload = {
    //     books: [
    //         {
    //             name: "Why we sleep",
    //             author: "Mathew Walker",
    //             quantity: 4
    //         }
    //     ]
    // }
    const book = new Book();
    book.createBookEntry(book)
}