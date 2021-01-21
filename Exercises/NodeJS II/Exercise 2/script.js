let moment = require('moment');

let localTime = moment();
console.log(localTime);

let utcTime = moment.utc();
console.log(utcTime);

let timeDiff = localTime.diff(utcTime);
console.log(timeDiff);

let higher = moment(localTime).isAfter(utcTime);
console.log(higher);

if (higher){
    console.log(localTime)
}else{
    console.log(utcTime);
}