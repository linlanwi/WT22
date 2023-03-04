const express = require('express');
const router = express.Router();
const ToDo = require('./models/toDos'); //binden Member-Model ein

/*// eine GET-Anfrage, req = request-Objekt, res = response-Objekt
router.get('/', async(req, res) => { 
    // angenommen da stünde "/fiw", dann wäre es localhost:3000/fiw
    // res wird durch die Anfrage erzeugt
    res.send({ message: "Hello FIW!" }); // senden ein JavaScript-Objekt zurück, enthält Schlüssel message
});*/

// CRUD
// (READ) get all members
router.get('/toDos', async(req, res) => {
    const allToDos = await ToDo.find();
    console.log(allToDos);
    res.send(allToDos);
});
// find() ist aus MongoDB
// get ist HTTP-Methode

// Route ist localhost:3000/members
// anonyme Callback Fkt. mit async & await
// find()-Fkt. ist ein sog. Promise, wird asynchron ausgeführt, irgendwann ist ein Ergebnis verfügbar oder gibt einen Fehler zurück
// await -> auf eines der beiden Fälle wird gewartet
// nur async deklarierte Fkt. darf await Aufruf enthalten

module.exports = router;

// (CREATE) post one member
router.post('/toDos', async(req, res) => {
    const newToDo = new ToDo({
        title: req.body.title,
        description: req.body.description,
        completed: Boolean(req.body.completed) // konvertiert String in Boolean
    })
    await newToDo.save();
    res.send(newToDo);
});
// save()-Fkt. schreibt/speichert Datensatz in die DB
// Zeile 33-36: Daten werden aus Body des request ausgelesen & mit diesen ein neues Member-Objekt erzeugt
// Zeile 39: response wird zurückgeschickt

// (READ ONE) get one member via id
router.get('/toDos/:id', async(req, res) => {
    const toDo = await ToDo.findOne({ _id: req.params.id });
    console.log(req.params);
    if(toDo) {
        res.send(toDo);
    } else {
        res.status(404);
        res.send({
            error: "ToDo does not exist!"
        });
    }
})
// id wird aus URL des Endpunktes ausgelesen
// Datensatz der id wird im JSON zurückgegeben
// parametrisierte Routen werden per : & Namen des Parameters erstellt (hier id)
// um Wert des Parameters id aus der Parameterliste auszulesen wird params verwendet

// findOne() in MongoDB: Zum Finden eines einzelnen Datensatzes
// existiert id, dann wird dieser in response zurückgesendet
// existiert er nicht: Statuscode 404 & Error-Nachricht

// update one member
router.patch('/toDos/:id', async(req, res) => {
    try {
        const toDo = await ToDo.findOne({ _id: req.params.id })

        if (req.body.title) {
            toDo.title = req.body.title
        }

        if (req.body.description) {
            toDo.description = req.body.description
        }

        if (req.body.completed) {
            toDo.completed = req.body.completed
        }

        await ToDo.updateOne({ _id: req.params.id }, toDo);
        res.send(toDo)
    } catch {
        res.status(404)
        res.send({ error: "ToDo does not exist!" })
    }
});
// HTTP-Anfragemethode Patch
// MongoDB-Fkt: updateOne() -> erwartet als ersten Parameter einen filter
// filter: d.h Werte nach denen nach einem Datensatz gesucht werden soll, hier die id_
// Der zweite Parameter der updateOne()-Funktion sind die zu ändernden Werte für diesen Datensatz
// die zu ändernden Werte werden als ein JSON dem body des request-Objektes übergeben

// delete one member via id
router.delete('/toDos/:id', async(req, res) => {
    try {
        await ToDo.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "ToDo does not exist!" })
    }
});
// Datensatz wird über _id ermittelt und dafür erneut die parametrisierte URL ausgelesen



//------------------------- Allgemeines zu Route.js -------------------------------------------
// bei Router handelt es sich um eine Middleware, die Routen verwaltet und request-Objekte an die entsprechenden Routen weiterleitet & response-Obj. empfängt