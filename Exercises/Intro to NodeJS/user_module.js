class User{
    name = 'Juan';
    lastName = 'Castro';
    email = 'juancastro@email.com';
    phone = '123456';

    fullName = () =>{
        return this.name + ' ' + this.lastName;
    };
}

class Animal{
    name = 'Paco';
    age = '14';
}

module.exports = {
    User,
    Animal
};