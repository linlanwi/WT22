const express = require('express');
const router = express.Router();

// eine GET-Anfrage, req = request-Objekt, res = response-Objekt
router.get('/', async(req, res) => { 
    // angenommen da stünde "/fiw", dann wäre es localhost:3000/fiw
    // res wird durch die Anfrage erzeugt
    res.send({ message: "Hello FIW!" }); // senden ein JavaScript-Objekt zurück, enthält Schlüssel message
});

module.exports = router;


// bei Router handelt es sich um eine Middleware, die Routen verwaltet und request-Objekte an die entsprechenden Routen weiterleitet & response-Obj. empfängt