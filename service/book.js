const db = require('../models');

class Book {
    constructor(id, name, author, stock){
        this.id = id;
        this.name = name;
        this.author = author;
        this.stock = stock;
    }

    get_name() {
        return this.name;
    }

    get_author() {
        return this.author;
    }

    createBookEntry() {
        
    }
}

export default Book