var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let option = { useNewUrlParser: true };  // new
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = "mongodb+srv://shizhao:shizhaoYang@cluster0-ddb2g.mongodb.net/test?retryWrites=true&w=majority";


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  // new
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// new code from example
//const port = 3000;
const port=process.env.PORT || 3000
MongoClient.connect(mongoUrl, option, (err, database) => {
    if (err) return console.log(err)
    let db = database.db("PROG219DB")
    require('./routes/index')(app, db);

    app.listen(port, () => {
        console.log('Web server is live on ' + port);
    });

})


