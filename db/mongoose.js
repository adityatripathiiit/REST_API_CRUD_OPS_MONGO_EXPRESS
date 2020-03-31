const mongoose = require('mongoose');


const MONGODB_URL = 'mongodb+srv://user:<password>@projects-7jhnx.gcp.mongodb.net/test?retryWrites=true&w=majority'

const connectionFactory = () => {
    console.log('connected');
    return mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
};

module.exports = connectionFactory;