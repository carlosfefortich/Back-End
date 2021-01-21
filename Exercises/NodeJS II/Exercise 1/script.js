require('dotenv').config();
var moment = require('moment');

console.log(process.env.FECHA);

var a = moment(process.env.FECHA);
var b = a.add(1, 'week');
a.format();
console.log(a);
console.log(b);