const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const PORT = 666;


app.use(express.json());
app.use(cors(
    {
        origin: 'http://127.0.0.1:5500'
    }
));
const limiter = rateLimit({
    max:10,
    windowMs: 60*60*100,
    message:"You cannot make more requests to this API"
});
app.use(limiter);

let users = [
    {mail: "mail@uno.com", pass:"1234", name: "name1", lastname: "lastname1", age: 15},
    {mail: "mail@dos.com", pass:"1234", name: "name2", lastname: "lastname2", age: 15},
    {mail: "mail@tres.com", pass:"1234", name: "name3", lastname: "lastname3", age: 15}
]

app.post('/login', (req, res)=>{
    console.log(req.body);
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if((req.body.mail === user.mail) && (req.body.pass === user.pass)){
            let secureUser = {mail: user.mail, name: user.name, lastname: user.lastname, age: user.age};
            console.log('Authorized!');
            console.log(secureUser);
            res.status(200).json(secureUser);
            return;
        }
    }

    console.log('Not Authorized');
    res.status(400).json('You are not authorized');
});



app.listen(PORT,()=>{
    console.log('Server running at port ' + PORT);
});