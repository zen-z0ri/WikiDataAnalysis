/**
 * Created by tung on 12/05/17.
 */
let express = require('express');
let controller = require('../controllers/analy.server.controller');

let router = express.Router();

router.get('/',controller.showPage); //url path

router.get('/', controller.getTitle);//url path
module.exports = router;