const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = () => {
    return mongoose.connect(process.env.DB_STRING);
}

module.exports = mongoose;
module.exports = connectMongo;