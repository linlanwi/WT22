const express = require('express');
const router = express.Router();
const Member = require('./models/members'); //binden Member-Model ein

/*// eine GET-Anfrage, req = request-Objekt, res = response-Objekt
router.get('/', async(req, res) => { 
    // angenommen da stünde "/fiw", dann wäre es localhost:3000/fiw
    // res wird durch die Anfrage erzeugt
    res.send({ message: "Hello FIW!" }); // senden ein JavaScript-Objekt zurück, enthält Schlüssel message
});*/

// CRUD
// (READ) get all members
router.get('/members', async(req, res) => {
    const allMembers = await Member.find(); 
    console.log(allMembers);
    res.send(allMembers);
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
router.post('/members', async(req, res) => {
    const newMember = new Member({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        ipaddress: req.body.ipaddress
    })
    await newMember.save();
    res.send(newMember);
});
// save()-Fkt. schreibt/speichert Datensatz in die DB
// Zeile 33-36: Daten werden aus Body des request ausgelesen & mit diesen ein neues Member-Objekt erzeugt
// Zeile 39: response wird zurückgeschickt

// (READ ONE) get one member via id
router.get('/members/:id', async(req, res) => {
    const member = await Member.findOne({ _id: req.params.id });
    console.log(req.params);
    if(member) {
        res.send(member);
    } else {
        res.status(404);
        res.send({
            error: "Member does not exist!"
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
router.patch('/members/:id', async(req, res) => {
    try {
        const member = await Member.findOne({ _id: req.params.id })

        if (req.body.firstname) {
            member.firstname = req.body.firstname
        }

        if (req.body.lastname) {
            member.lastname = req.body.lastname
        }

        if (req.body.email) {
            member.email = req.body.email
        }

        if (req.body.ipaddress) {
            member.ipaddress = req.body.ipaddress
        }

        await Member.updateOne({ _id: req.params.id }, member);
        res.send(member)
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
});
// HTTP-Anfragemethode Patch
// MongoDB-Fkt: updateOne() -> erwartet als ersten Parameter einen filter
// filter: d.h Werte nach denen nach einem Datensatz gesucht werden soll, hier die id_
// Der zweite Parameter der updateOne()-Funktion sind die zu ändernden Werte für diesen Datensatz
// die zu ändernden Werte werden als ein JSON dem body des request-Objektes übergeben

// delete one member via id
router.delete('/members/:id', async(req, res) => {
    try {
        await Member.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
});
// Datensatz wird über _id ermittelt und dafür erneut die parametrisierte URL ausgelesen



//------------------------- Allgemeines zu Route.js -------------------------------------------
// bei Router handelt es sich um eine Middleware, die Routen verwaltet und request-Objekte an die entsprechenden Routen weiterleitet & response-Obj. empfängt