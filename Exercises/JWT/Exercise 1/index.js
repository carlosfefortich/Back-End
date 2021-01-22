const jwt = require('jsonwebtoken');
const info = {name: 'Carlos'};
const secretKey = 'My_own_secret';
const token = jwt.sign(info, secretKey);
console.log('This is the token: ' + token);

const decodeToken = jwt.verify(token, secretKey);
console.log('Info contained in the token: ' + decodeToken);