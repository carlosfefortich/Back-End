const coolImages = require("cool-images");
let moment = require('moment');
var fs = require('fs');

let images = coolImages.many(200, 200,10, true);
console.log(images);
let image = images.forEach((img)=>{
    console.log(img);
});
console.log(image);

let time = moment();
console.log(time);

let pack = [time, images];
console.log(pack);

pack.forEach((object)=>{
    let stringObject = object.toString() + "\n";
    console.log(stringObject);
    
    fs.appendFile('logs.txt', stringObject, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
});
