const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/first_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const Msg = mongoose.model('Message', {
    msg: String
});

let message = new Msg({msg: 'Hello world!'});

message.save();

Msg.find().then((result)=>{
    console.log(result);
});