const express = require('express');
const { execPath } = require('process');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const dbURI = require('./env/uriString');

// express app
const app = express();

// connect to mongodb
mongoose.connect(dbURI).then((result) => {
    console.log("App is live at localhost:3000/");
    // listen for requests
    app.listen(3000);
}).catch((err) => {
    console.log("lol")
    console.log(err)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & ststic files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// third party middleware
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Blog not found' });
});