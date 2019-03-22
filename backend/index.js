const express = require('express');
const app = express();

const fs = require('fs');

const port = 4000;


// BODY PARSE TO JSON
app.use(express.json());


// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/data', (req, res) => {
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);
    res.json(data);
})

app.get('/increment', (req, res) => {
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);
    data.counterValue += 1;
    fs.writeFileSync('./db.json', JSON.stringify(data))
    res.json(data);
})

app.get('/decrement', (req, res) => {
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);
    data.counterValue -= 1;
    fs.writeFileSync('./db.json', JSON.stringify(data))
    console.log(res.json(data));
})

app.get('/incrementBy/:amount', (req, res) => {
    const jsonString = fs.readFileSync('./db.json', 'UTF-8');
    const data = JSON.parse(jsonString);

    let amont = Number(req.params.amount)
    data.counterValue += amont;
    fs.writeFileSync('./db.json', JSON.stringify(data));
    res.json(data);
})

app.listen(port, () => console.log('Servidor levantado en ' + port));