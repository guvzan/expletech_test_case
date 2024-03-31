const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware')
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');


const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected! Now listening for requests.')
        app.listen(port)
    })
    .catch((err) => {
        console.log('Connection to database failed, check details:', err)
    })

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/protected', requireAuth, (req, res) => {
    res.send('Protected page')
})

app.use(authRoutes);
app.use(taskRoutes);

app.get('*', function(req, res){
    res.status(404).send('Page not found');
});

//Catch uncaught exceptions
process.on('uncaughtException', function (err) {
    // handle the error safely
    console.log(err);
    logger.error(err.stack);
});


