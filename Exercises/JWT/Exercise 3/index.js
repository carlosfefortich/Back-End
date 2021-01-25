const { response } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();

app.use(express.json());

const user = {
    name: 'Juanita',
    password: '1234'
}

app.post('/login', (req, res)=>{
    console.log(req.body);
    if ((req.body.name === user.name) && (req.body.password === user.password)){
        let payload = {
            name: user.name,
            age: 34,
            role: 'admin',
            favoriteMovies: ['movie1', 'movie2', 'movie3']
        };

        let token = jwt.sign(payload, process.env.SECRET_KEY);
        const response = {
            token
        }
        res.status(200).json(response);
    }else {
        res.status(401).json('Invalid username or password ');
    }
});

app.get('/products', (req,res)=>{
    try {
        let token = req.headers.authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        res.status(200).json('Valid token! Welcome '+ `${payload.name}`);
    } catch (error) {
        res.status(401).json('Invalid token');
    }
})

app.listen(process.env.PORT, ()=>{
    console.log('Server running and ready to go!');
})