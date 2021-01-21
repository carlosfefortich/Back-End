const { json } = require('express');
const express = require('express');

const app = express();

const port = 3000;

app.use(express.json());

app.get('/',(req, res)=>{
    let result = {
        data: {
            name: 'Pedro',
            gender: 'Male',
            phone: '123456',
            age: '34'
        },
        page: 1
    }
    res.send(result);
});

app.post('/user', (req, res)=>{
    try{
        let user = req.body;
        console.log(user);
        if(user.age){
            user.age += 10;
        }else{
            throw new Error('No age found');
        }
        
        res.send(user);
    }catch (exception) {
        res.status(400).json(exception.message);
    }
    
});

let users = 
    [{ name: "Julian", age: 26}, 
    {name: "Carlos", age: 24}
];

app. get ('/user/:name/:age', (req,res)=>{
    let query = req.params;
    console.log('URL PARAMS', query); //The ones that are specified with the ":"
    console.log('QUERY PARAMS', req.query); //The ones that are specified after the ? sign
    let user = users.find((usersArray)=> usersArray.name === query.name);
    res.send(user);
});

app. get ('/users', (req,res)=>{
    let query = req.query;
    console.log(query);
    let user = users.find((usersArray)=> usersArray.name === query.name);
    res.send(user);
});

app.listen(port, ()=>{
    console.log('Server running at port ' + port);
});