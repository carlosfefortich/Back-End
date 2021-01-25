require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const server = express();

server.use(express.json());

const users = [{
        name: 'Armando',
        email: 'armando@email.com',
        role: 'guest',
        password: 'abcd'
    },
    {
        name: 'Susana',
        email: 'susana@email.com',
        role: 'employed',
        password: 'qwerty'
    },
    {
        name: 'Adriana',
        email: 'adriana@email.com',
        role: 'admin',
        password: 'asd123'
    }
];

const validateToken = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json('Invalid token by middleware');
    }
};

const validateGuestRole = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token);
    if(payload.role === 'guest'){
        next();
    }else{
       res.status(401).json('You dont have permission to do that'); 
    };
}

const validateEmployedRole = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token);
    if(payload.role === 'employed' || payload.role === 'admin'){
        next();
    }else{
       res.status(401).json('You dont have permission to do that'); 
    };
}

const validateAdminRole = (req, res, next)=>{
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token);
    if(payload.role === 'admin'){
        next();
    }else{
       res.status(401).json('You dont have permission to do that'); 
    };
}

server.post('/login', (req, res)=>{
    const user = req.body;
    const existingUser = users.find((u)=> u.email === user.email);
    if (!existingUser){
        console.log('User not found');
        res.status(401).json('Incorrect email or password ');
    }else if(user.password === existingUser.password){
        const payload = {
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY);
        res.status(200).json({token: token});
    }else{
        console.log('Incorrect password');
        res.status(401).json('Email or password incorrect');
    };
});

server.get('/userInfo', validateToken, validateGuestRole,(req,res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token);
    res.send('Welcome ' + `${payload.name}`);

});

server.get('/store',validateToken,validateEmployedRole, (req, res)=>{
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token);
    res.send('Welcome ' + `${payload.name}` + '! You can manage the store!');
});

server.listen(process.env.PORT, ()=>{
    console.log('Server running and ready to go!');
});