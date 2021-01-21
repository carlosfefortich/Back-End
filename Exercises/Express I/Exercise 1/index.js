var express = require('express');
var app = express();

let middle = (req, res, next)=>{
    console.log('Hello world with a middleware');
    next();
}

app.get('/my_route', middle, function(req,res){
    res.send('Hello world');
});

app.listen(3000, function(){
    console.log('Escuchando en el puerto 3000');
});