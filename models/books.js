const mongoose = require('mongoose');
const validator = require('validator');
const mySchema = {
title: {
    type: String,
    require: true,
    trim: true,
},
isbn: {
    type: String,
    require: true,
    trim: true,
    validate(value) {
        if(!validator.isISBN(value)){
            throw new Error('ISBN is invalid');
        }
    }
},
author: {
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    }
},
publishingDate: {
    type: String
},

finishedReading: {
    type: Boolean,
    required: true,
    default: false
},
}

const bookSchema = mongoose.Schema(mySchema);
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;