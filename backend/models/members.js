const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    ipaddress: String
});

module.exports = mongoose.model('Member', schema); // Datenmodell heißt Member

// Mongoose ist Schema-basiert (Schema ist wie ein Datenmodell)
// Schema wird durch Aufruf des Konstruktors new Schema() erstellt
// unter Verwendung des Schemas wird mit der model()-Fkt. das Datenmodell erzeugt

// können mit Mongoose-Models auf die MongoDB zugreifen
