const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from API.");
})

mongoose.connect('mongodb://localhost:27017/notes')
.then(() => {
    console.log('Connected to Database!');
    app.listen(5000, () => {
        console.log("Server is running on port 3000.");
    });
})
.catch(() => {
    console.log('Connection failed!');
});

