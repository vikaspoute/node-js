const fs = require('fs');
const os = require('os')

// fs.writeFileSync('./text.txt', "Hello World!");
// fs.writeFile('./text.txt', "Hello World!, Async", (err) => {});

// const res = fs.readFileSync('./text.txt', 'utf8');
// console.log(res);

// fs.readFile('./text.txt', 'utf8', (err, res) => {
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log(res);
//     }
// })

console.log(os.cpus().length);




// basically sync is returns somthing and async is not returns any 