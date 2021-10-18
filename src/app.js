require('dotenv').config()
const PORT = process.env.PORT || 3000;
const express = require('express');
const morgan = require('morgan');
const path = require('path')
const publicDirectoryPath = path.join(__dirname, '../public/static')
const mongoose = require('mongoose');
const dbURI = process.env.dbURL || 'mongodb://localhost/blogs';
const blogRoutes = require('./routes/BlogRoutes');
const appRoutes = require('./routes/AppRoutes');

// create express instance (app) 
const app = express();
app.use(express.urlencoded({ extended: true }));
// view engine specs
app.set('view engine', 'ejs');
app.set('views', 'public')

// middlewares
app.use(morgan('dev')); // tiny
// static files
app.use(express.static(publicDirectoryPath))

mongoose.connect(dbURI)
    .then((result) => {
        console.log("Connected to MongoDB successfully", result.connections.values);
        const server = app.listen(PORT, () => {
            console.log("Server listening on port ", server.address().port);
        });
    })
    .catch(error => {
        console.log("There was an error connecting to database ", error);
    });

app.use(appRoutes);
app.use('/blogs', blogRoutes);

// 404 page (must always be at the bottom )
app.use((request, response) => {
    response.render('404', {
        title: "Page not found"
    });
});