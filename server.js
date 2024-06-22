const express = require('express');
const fs = require ('fs');
const path = require ('path');
const app = express();
const PORT = process.env.PORT || 3000;

//middleware for parsing json and url- encoded data

app.use(express.json());
app.use(express.urlencoded({extendedL true}));