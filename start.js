const https = require('https');
const fs = require('fs');

const server = https.createServer();

fs.readFile('./new.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

fs.writeFile('./new1.txt', 'hello write here', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File written successfully!');
});

fs.readFile('./new1.txt', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

server.on('request', (req, res) => {
    fs.readFile('./new.txt', (err, data) => res.end(data));
});

server.on('request', (req, res) => {
    fs.writeFile('./new1.txt', 'write', (err, data) => res.end(data));
});
server.on('request',(req,res)=>{
    let rs = fs.createReadStream('./new.txt')
    rs.on('data',(chunk)=>{
        res.write(chunk)
    })  
    res.end()
})

server.on('request',(req,res)=>{
    let rs=fs.createReadStream('./new.txt')
    rs.pipe(res)
})
const EventEmitter = require('events');

// Create an instance of EventEmitter
const myEmitter = new EventEmitter();
fs.writeFileSync('example.txt','hello you are example')
// Register an event handler for the 'open' event
myEmitter.on('open', (file) => {
    console.log(`File ${file} is opened.`);
});

// Emit the 'open' event
myEmitter.emit('open', 'example.txt');
fs.readFile('./example.txt','utf-8',(err,data)=>console.log(data))

server.listen(8000, 'localhost', () => console.log('hello folly why'));
