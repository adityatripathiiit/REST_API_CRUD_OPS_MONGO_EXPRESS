const express = require('express'); 
const mongoose = require('mongoose');


const connectionFactory = require('./db/mongoose.js');
const Book = require('./models/book.js');


const app = express(); 

connectionFactory();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.post('/books', async (req, res, next) => {
    try {
        const book = new Book(req.body.book);
        await book.save();    
        return res.status(201).send({ book });
    } catch (e) {
        next(e)
    }
});


app.get('/books/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) return res.status(404).send({ error: 'Not Found' });
        
        return res.send({ book });
    } catch (e) {
           next(e);
    }
});


app.patch('/books/:id', async (req, res, next) => {
    const { id } = req.params;
    const { updates } = req.body;
    
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, updates, { runValidators: true, new: true });
        
        if (!updatedBook) return res.status(404).send({ error: 'Not Found' });
        
        return res.send({ book: updatedBook });
    } catch (e) {
        next(e);
    }
});


app.delete('/books/:id', async (req, res, next) => {
    try {
        const deletedBook = await  Book.findByIdAndDelete(req.params.id);
        
        if (!deletedBook) return res.status(404).send({  error:  'Not Found' });
        
        return res.send({ book: deletedBook });
    } catch (e) {
        next(e);
    }
});

// Notice - bottom of stack.
app.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send({  error:  'Validation Error' });
    } else if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({  error:  'Not a valid ID' });
    } else {
        console.log(err);
        return res.status(500).send({  error:  'Internal error' });
    }
});


app.listen(PORT, () => console.log(`Server is up on port ${PORT}.`));