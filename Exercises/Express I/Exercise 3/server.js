const express = require('express');
const app = express();
const port = 2000;

app.use(express.json());

let phones = [{model: 'samsumg', price: 600, number: 123},{model: 'iphone', price: 700, number: 456},{model: 'hwawei', price: 400, number: 789}, {model: 'hwawei', price: 300, number: 789}];

app.get('/', (req, res)=>{
    res.send(phones);
});

app.post('/create', (req, res)=>{
    let newPhone = req.body;
    phones.push(newPhone);
    console.log('Phone added successfully!', newPhone);
    console.log(phones);
    res.status(200).json(phones);
});

app.put('/update/:number', (req,res)=>{
    let phoneToUpdate = req.params;

    let updatedInfo = req.body;
    console.log(updatedInfo);
    let findPhone = phones.find((phonesArray)=> phonesArray.number.toString() === phoneToUpdate.number);
    console.log(findPhone);
    let filter = phones.filter((value)=>{
        return value != findPhone;
    });
    console.log(filter);
    filter.push(updatedInfo);
    res.status(200).send(filter);
});

app.delete('/delete',(req, res)=>{
    let info = req.query;
    let phoneToDelete = phones.find((phonesArray) => phonesArray.number.toString() === info.number);
    console.log(phoneToDelete);
    let filter = phones.filter((value)=>{
        return value != phoneToDelete;
    });
    console.log(filter);
    res.status(200).send(filter);
});

app.get('/search', (req,res)=>{
    var cheapPhones = [];

    phones.forEach(phone => {
        if(phone.price < 500){
            cheapPhones.push(phone);   
        }
    });

    console.log(cheapPhones);
    res.status(200).json(cheapPhones);
});

app.listen(port, ()=>{
    console.log('Server listerning at port ' + port);
});