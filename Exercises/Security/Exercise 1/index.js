const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();
const PORT = 3000;

app.use(helmet());
app.use(express.json());

app.set('trust proxy', (ip)=>{
    console.log(ip);
    if (ip === '127.0.0.1' || ip === '123.123.123.123') return true;
    else return false;
});

app.enable('trust proxy');

const limiter = rateLimit({
    windowMs: 15*60*1000, //Time. 15 minutes
    max: 100  // Limits each IP to 100 requests per window
});

app.use(limiter);

app.get('/', (req, res)=>{
    res.send('ok');
});

app.listen(PORT, ()=>{
    console.log('Server running at port ' + PORT);
});