const express = require('express'); // importieren Express
const cors = require('cors'); // Cross-origin resource sharing
const routes = require('./routes'); // routes.js wird eingebunden
const mongoose = require('mongoose'); // um sich in Node.js mit der MongoDB zu verbinden
mongoose.set('strictQuery', false); // Vorbereitung auf Mongoose-update, wurde in der bash vorgeschlagen
const app = express(); 
const PORT = 3000; // legen die Portnummer fest
const userRoutes = require('./routes/users');

require('dotenv').config(); 
// importiert dotenv-Paket (für sicheren Zugang, speichert zugangssichere Daten)
// config()-Funktion liest die .env-Datei ein

app.use(express.json()); // alle JavaScript-Objekte in der response nach JSON umwandeln

// enable cors for all requests
app.use(cors());
app.use('/', routes); 
app.use('/users', userRoutes);

// Verbindung zu MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todos', { dbName: 'todos' });
const db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});
// Methode once() gibt an, dass die Verbindung nur einmal geöffnet wird & dass der Server erst bei erfolgreicher Verbindung gestartet wird


app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `); // Syntax in template literal, also backticks
    }
});
// Aufruf listen()-Fkt. startet den Webserver