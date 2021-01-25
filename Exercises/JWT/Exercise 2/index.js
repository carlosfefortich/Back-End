const { json } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const server = express();

server.use(express.json());

let users = [{user:'Carlos', pass: 'pass123'}];

let validateUser = (req, res, next)=>{
    const info = req.body;
    users.forEach((user)=>{
        if((info.user === user.user)&&(info.pass === user.pass)){
            next();
            return;
        }else{
            console.log('User not valid');
            res.status(400).json('User or password not valid');
        }
    });
};

let validateToken = (req, res, next)=>{
    try {
        let token = req.headers.authorization.split(' ')[1];
        console.log(token);
        let verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifiedToken);
        if(verifiedToken){
            req.user = verifiedToken;
            return next();
        }
    } catch (error) {
        res.json({error: 'No validation was possible'});
    }
    
};

server.post('/login', validateUser, (req,res)=>{
    let {user, pass} = req.body;
    let token = jwt.sign({user}, process.env.SECRET_KEY);
    /*res.status(200).send('User Authenticated! Welcome ' + `${user}`);*/
    res.status(200).json({token: token});

});

server.post('/secure', validateToken, (req,res)=>{
    console.log(req.user);
    res.status(200).send('User Authenticated! Welcome ' + `${req.user.user}`);
})

server.listen(process.env.PORT, ()=>{
    console.log('Server listening and ready to go!');
});
