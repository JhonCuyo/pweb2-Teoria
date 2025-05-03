const express = require ("express");
const app=express();

app.get('/data', (req, res) =>{
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error leyendo archivo');
        res.json(JSON.parse(data));
    });
});

app.listen(3000, ()=> {
    console.log("escuchando en puerto ", 3000);
    
});