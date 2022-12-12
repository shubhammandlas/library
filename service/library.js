import { query } from 'express';

const db = require('../models');
const User = require('./user')
const Book = require('./book')

class Library {
    constructor(db){
        this.db = db;
        this.user_id;
        this.unavailable_orders = []
        this.total_rent = 0
    }

    login_user(payload) {
        const user = payload.user;
        const user = new User(payload.user.name, payload.user.email, payload.user.contact)
        var query = `SELECT * from User where contact = "${user.contact}"`;
        const db_user = db.sequelize.query(query)
        if(!db_user) {
            query = `INSERT INTO User (name, email, contact) VALUES (${user.name}, ${user.email}, ${user.contact})`
            user_id = db.sequelize.query(query);
        }
        this.user_id = db_user ? db_user.user_id : user_id;
        return user_id
    }

    rent_books(payload) {
        const requested_books = payload.books;
        requested_books.array.forEach(book => {
            book_object = this.get_book_object(book_payload);
            create_booking(book_object, book_payload)
        });
    }

    get_book_object(book) {
        var query = `SELECT * from Book where name = "${book.name}"`;
        const db_book = db.sequelize.query(query);
        return Book(db_book.id, db_book.name, db_book.author, db_book.stock);
    }

    create_booking(bookDbObject, book_payload) {
        if (bookDbObject.stock > book_payload.quantity) {
            var query = `INSERT INTO Booking (userId, bookId, status, quantity) VALUES (${this.user_id}, ${bookDbObject.bookID}, 'RENTED', ${book_payload.quantity})`
            this.db.sequelize.query(query);

            remaining_books = bookDbObject.stock - book_payload.quantity;
            query = `UPDATE Book SET stock = ${remaining_books} WHERE id = ${bookDbObject.id}`
        }
        else{
            this.unavailable_orders.push({
                'book_name': book_object.name,
            })
        }
        
    }


    return_books(payload) {
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
        const returnedBooks = payload.books;
        returnedBooks.array.forEach(returnedBook => {
            const book_object = this.get_book_object(returnedBook);
            const booking = this.calculateRent(book_object, returnedBook);
            this.endBooking(booking);
            this.updateBookStock(returnedBook);
        });
        return this.total_rent;
    }

    calculateRent(book_object, returnedBook) {
        const query = `SELECT * from Booking where book_id = ${book_object.book_Id} AND user_id = ${this.user_id}`;
        const booking = this.db.sequelize.query(query)
        const days = Math.floor(((booking.createdAt()).getTime() - (new Date()).getTime()) / (24*60*60*1000))
        this.total_rent += days * 1 * returnedBook.quantity
        return booking
    }

    endBooking(booking) {
        const query = `UPDATE Booking SET Status = 'RETURNED' where id = ${booking.id}`;
        this.db.sequelize.query(query);
    }

    updateBookStock(returnedBook) {
        const query = `UPDATE Book SET stock = stock + ${returnedBook.quantity} `;
        this.db.sequelize.query(query);
    }
}

export default Library