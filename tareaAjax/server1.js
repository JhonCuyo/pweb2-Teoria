const express = require ("express");
const fs=require("fs");
const path=require("path");
const app=express();

app.use(express.static(__dirname)); 

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'problema1.html'));
  });
  app.get('/script1.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'script1.js'));
  });

app.get('/data', (req, res) =>{
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error leyendo archivo');
        }
        res.json(JSON.parse(data));
    });
});

app.listen(3000, ()=> {
    console.log("escuchando en puerto ", 3000);
    
});