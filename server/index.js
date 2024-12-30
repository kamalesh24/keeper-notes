const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
},
{
    timestamps: true,
});

const Note = mongoose.model("note", noteSchema);

// Routes
app.route('/api/notes')
.get(async (req, res) => {
    try {
        const foundNotes = await Note.find({});
        res.json(foundNotes);
    } catch (error) {
        res.json({message: error.message});
    }
})

.post(async (req, res) => {
    try{
        const newNote = await Note.create(req.body);
        res.json(newNote);
    } catch(error){
        res.json({message: error.message});
    }
    
});

app.route('/api/notes/:id')
.delete(async (req, res) => {
    try {
        const { id } = req.params;
        const deleteNote = await Note.findByIdAndDelete(id);

        if(!deleteNote){
            return res.json({message: "Note doesnot exist."});
        }

        res.json({message: "Note deleted successfully."});

    } catch (error) {
        res.json({message: error.message});
    }
});


// Connection
mongoose.connect('mongodb://localhost:27017/notes')
.then(() => {
    console.log('Connected to Database!');
    app.listen(5000, () => {
        console.log("Server is running on port 5000.");
    });
})
.catch(() => {
    console.log('Connection failed!');
});

