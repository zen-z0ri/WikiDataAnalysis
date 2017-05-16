/**
 * Created by tung on 12/05/17.
 */
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let staroutes = require('./app/routes/analy.server.routes');

let app = express();
app.locals.dbPullD= new Date();
app.set('views', path.join(__dirname,'app/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',staroutes); //usse revroutes in /revision url path
app.listen(3000, function () {
    console.log('Revision app listening on port 3000!');
});

module.exports = app;