var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');

var config={
 user:'akshayavrp',
 database:'akshayavrp',
 host:'db.imad.hasura-app.io',
 port:'5432',
 password:process.env.DB_PASSWORD
};


var app = express();
app.use(morgan('combined'));
//to tell our express app to tell that if it sees json contetn load that into req.body variable
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash(input,salt){
   var hashed= crypto.pbkdf2Sync('secret', 'salt', 100000, 512, 'sha512');
   return ["pbkdf","10000",salt,hashed.toString('hex')].join('$');
}

app.get('/hash/:input',function(req,res) {
    var hashedString=hash(req.params.input,'random-string');
    res.send(hashedString);
    
});

app.post('/create-user',function(req,res) {
    
    var username=req.body.username;
    var password=req.body.password;//assume username and password are JSON request
    var salt=crypto.getRandomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbString],function(err,result){
       if(err)
       {
           res.status(500).send(err.toString());
       }else{
           res.send('User succesfully created!!'+username);
       }
    });
    
});


var pool=new Pool(config);

var counter=0;
app.get('/counter',function(req,res){
counter=counter+1;
res.send(counter.toString());
});
app.get('/article1',function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'article1.html')); 
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
