/**
 * Created by tung on 12/05/17.
 */
'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const staRoutes = require('./app/routes/analy.server.routes');

const app = express();

app.set('views', path.join(__dirname,'app/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',staRoutes); //use revroutes
app.listen(3000, function () {
  console.log('Revision app listening on port 3000!');
});

module.exports = app;