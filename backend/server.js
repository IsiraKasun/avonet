const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const userRouter = require('./routes/user-router');
const expenseRouter = require('./routes/expense-router');
const catagoryRouter = require('./routes/catagory-router');
const connectMongo = require('./db-connect');
const bodyParser = require('body-parser');
const cors = require('cors')

require('dotenv').config();


app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.use(cors());

app.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();
});

app.use('/users', userRouter);

app.use('/expenses', expenseRouter);
app.use('/catagories', catagoryRouter);

app.use((req, res, next) => { 
    res.status(404).json({sts: -1, error: 'Invalid URL or request method'});
});

connectMongo().then (() => {
    console.log(`Database Connected`); 
    let port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server is listening in port ${ process.env.PORT}`);
    });
}).catch((error) => {
    console.log('Database connection failed', error);
})
