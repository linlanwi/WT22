const express = require('express'); // const für Deklaration von Konstanten
const router = express.Router();
const Todo = require('./models/todos'); // binden Todo-Model ein

// -------------------- CRUD --------------------
// (READ) get all members
router.get('/todos', async(req, res) => {
    const allTodos = await Todo.find(); 
    console.log(allTodos);
    res.send(allTodos);
});
// Z.7: get ist eine HTTP-Methode
// Z.8: find()-Fkt. ist aus MongoDB

// ------------ Async & Await anhand get all erklärt ------------ 
// asnyc & await sind asynchrone Operationen bei der Datenbankabfrage
// der 2. Parameter der router.get-Fkt. ist eine Fkt., die ausgeführt wird, wenn ein Client eine Anforderung an den Pfad sendet
// Fkt. mit dem Schlüsselwort async gekennzeichnet, was bedeutet, dass sie asynchron ist.
// innerhalb ruft die Route Todo.find()-Fkt., um alle Todos in der DB zu suchen
// da Fkt. asynchron ist, gibt sie ein Promise zurück
// Um auf das Ergebnis des Versprechens zu warten, verwenden wir await, um die Ausführung der Fkt. zu unterbrechen, bis das Versprechen erfüllt ist
// Wert wird allTodos erst zugewiesen, sobald Promise aufgelöst wurde

module.exports = router;

// (CREATE) post one member
router.post('/todos', async(req, res) => {
    const newTodo = new Todo({
        aufgabe: req.body.aufgabe,
        beschreibung: req.body.beschreibung,
        frist: req.body.frist
    })
    await newTodo.save();   // save()-Fkt. schreibt/speichert Datensatz in die DB
    res.send(newTodo);
});
// Z.29-31: Daten werden aus Body des request ausgelesen & mit diesen ein neues Todo-Objekt erzeugt
// Z.34: response wird zurückgeschickt

// (READ ONE) get one member via id
router.get('/todos/:id', async(req, res) => {
    try {
        const todo = await Todo.find({ _id: req.params.id });
        console.log(req.params);
        res.send(todo[0]);
    } catch {
        res.status(404);
        res.send({
            error: 'ToDo does not exist'
        })
    }
})
// Z.42: um Wert (also die Daten der Todo) des Parameters id aus der Parameterliste auszulesen wird params verwendet
// existiert id, dann wird dieser in response zurückgesendet
// existiert er nicht: Statuscode 404 & Error-Nachricht

// (UPDATE) update one member
router.patch('/todos/:id', async(req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id })

        if (req.body.aufgabe) {
            todo.aufgabe = req.body.aufgabe
        }

        if (req.body.beschreibung) {
            todo.beschreibung = req.body.beschreibung
        }

        if (req.body.frist) {
            todo.frist = req.body.frist
        }

        await Todo.updateOne({ _id: req.params.id }, todo);
        res.send(todo)
    } catch {
        res.status(404)
        res.send({ error: "ToDo does not exist!" })
    }
});
// für Update HTTP-Anfragemethode Patch
// Z.73: updateOne() -> erwartet als ersten Parameter einen filter, erhalten ein Todo durch die entsprechene id
// Z.73: zweiter Parameter der updateOne()-Funktion sind die zu ändernden Werte für diesen Datensatz
// die zu ändernden Werte werden als ein JSON dem body des request-Objektes übergeben

// (DELETE) delete one member via id
router.delete('/todos/:id', async(req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "ToDo does not exist!" })
    }
});
// Datensatz wird über _id ermittelt und dafür erneut die parametrisierte URL ausgelesen



//------------------------- Allgemeines zu Route.js -------------------------------------------
// bei Router handelt es sich um eine Middleware, die Routen verwaltet und request-Objekte an die entsprechenden Routen weiterleitet & response-Obj. empfängt