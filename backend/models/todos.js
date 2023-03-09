const mongoose = require('mongoose');

const schema = new mongoose.Schema({    
    aufgabe: String,
    beschreibung: String,
    frist : String
});
// Schema wird durch Aufruf des Konstruktors new Schema() erstellt

module.exports = mongoose.model('Todo', schema);    // model()-Fkt. erzeugt Datenmodell, welches Todo heißt 

// -------------- Allgemeines --------------
// Mongoose ist Schema-basiert (Ein Schema ist wie ein Datenmodell)
// Idee dahinter: können mit Mongoose-Models auf die MongoDB zugreifen
