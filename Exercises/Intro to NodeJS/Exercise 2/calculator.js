class Calculator{

    suma = (n1, n2)=>{
        return (n1 + '+' + n2 + '=' + (n1 + n2)+'\n');
        }

    resta = (n1, n2)=>{
        return (n1 + '-' + n2 + '=' + (n1 - n2)+'\n');
    }

    multiplicacion = (n1, n2)=>{
        return (n1 + 'x' + n2 + '=' + (n1 * n2)+'\n');
    }

    division = (n1, n2)=>{
        return (n1 + '/' + n2 + '=' + (n1 / n2)+'\n');
    }
}

module.exports = Calculator;