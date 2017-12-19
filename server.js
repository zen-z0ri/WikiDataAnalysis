/**
 * Created by tung on 12/05/17.
 */

import 'babel-polyfill';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import staRoutes from './app/routes/analy.server.routes';

let app = express();

app.set('views', path.join(__dirname,'app/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',staRoutes); //use revroutes
app.listen(3000, function () {
  console.log('Revision app listening on port 3000!');
});

module.exports = app;