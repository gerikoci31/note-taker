const express = require('express');
const fs = require ('fs');
const path = require ('path');
const app = express();
const PORT = process.env.PORT || 3000;

//middleware for parsing json and url- encoded data

app.use(express.json());
app.use(express.urlencoded({extendedL true}));

// serve static style.css and index.js from the public directory
app.use(express.static('public'));

// routes

app.get('/notes',(req,res) => { 
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'));

});

