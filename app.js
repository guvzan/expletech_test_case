const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware')

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');


const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

const dbURI = "mongodb+srv://vernmaks:pa$$word@cluster0.h6s4slq.mongodb.net/expletech_test_case?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
    .then((result) => {
        console.log('Connected! Now listening for requests.')
        app.listen(3000)
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


