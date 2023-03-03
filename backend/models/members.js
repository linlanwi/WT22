const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

module.exports = mongoose.model('Member', schema); // Datenmodell heißt Member

// Mongoose ist Schema-basiert (Schema ist wie ein Datenmodell)
// Schema wird durch Aufruf des Konstruktors new Schema() erstellt
// unter Verwendung des Schemas wird mit der model()-Fkt. das Datenmodell erzeugt

// können mit Mongoose-Models auf die MongoDB zugreifen
