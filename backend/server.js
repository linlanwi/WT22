const express = require('express'); // importieren Express
const routes = require('./routes'); // servers.js wird eingebunden
const mongoose = require('mongoose'); // um sich in Node.js mit der MongoDB zu verbinden
const app = express(); // erzeugen ein express Objekt, speichern dieses in app
const PORT = 3000; // legen die Portnummer fest
require('dotenv').config(); // importiert dotenv-Paket (für sicheren Zugang)
// config()-Funktion liest die .env-Datei ein

app.use(express.json()); // alle JavaScript-Objekte in der response nach JSON umwandeln
app.use('/', routes); // verwendet server.js; "erstellt" localhost:3000/ 

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE }); // greifen auf den Wert von DB_CONNECTION & DATABASE zu
// auf die in der .env-Datei hinterlegten Schlüssel-Werte-Paare, kann mittels process.env.<Schlüssel> zugegegriffen werden
mongoose.connect('mongodb://127.0.0.1:27017/toDos', { dbName: 'toDos' });
const db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});

// Zeile 11-17: Aufruf listen()-Funktion startet den Webserver
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `); // Syntax in template literal, also backticks
    }
});


// ---- Zusatz aus dem Skript ----
// app.listen([port[, host[, backlog]]][, callback])
// erster Parameter Port-Nr, zweiter Parameter anonyme Funktion => callback
// anonyme Funktion wird durch listen() aufgerufen
// im Fehlerfall wird der anonymen Fkt. ein error-Objekt übergeben