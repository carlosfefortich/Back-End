const express = require("express");
const app = express();

const PORT = 3000;

let users = [
    {id: 1, name: "John", email: "john@nomail.com"},
    {id: 2, name: "Katherine", email: "katherine@nomail.com"},
    {id: 3, name: "Daniel", email: "daniel@nomail.com"}
];

app.use(express.json());

function validateDataType(req, res, next){
    const {id} = req.params;
    const {name} = req.query;
    if((id && !name || !id && name)){
        if((id && !name)&& Number(id)){
            return next();
        }else{
            res.status(400).json('Invalid request! ID must be a number!');
        }
        console.log('Middleware successfully applied');
        return next();
    }else{
        res.status(400).json('Invalid request. Missing parameters');
    }
};

app.get('/user/:id', validateDataType, (req,res)=>{
    let id = req.params.id;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if(user.id==id){
            res.json(user);
        };
        
    }
    console.log(id);
    res.status(404).json('The user does not exist!');
});

app.get('/user', validateDataType, (req,res)=>{
    let name = req.query.name;
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if(user.name===name){
            res.json(user);
        };
    
    }
    console.log(name);
    res.status(404).json('The user does not exist!');
});

app.listen(PORT, ()=>{
    console.log('Listening at port ' + PORT);
});