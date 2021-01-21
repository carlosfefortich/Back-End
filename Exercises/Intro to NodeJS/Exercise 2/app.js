const CAL = require('./calculator');
const FS = require('fs');

let calculator = new CAL();

let n1 = 7;
let n2 = 4;

let suma = calculator.suma(n1,n2);
let resta = calculator.resta(10,4);
let multiplicacion = calculator.multiplicacion(n1,n2);
let division = calculator.division(15,3);

let myArray = [suma, resta, multiplicacion, division];

let operations = myArray.forEach((operation)=>{
    console.log(operation.toString());

    FS.appendFile('Calculator.txt', operation, function (err) {
    if (err) throw err;
    console.log('Saved!');
    });
});




