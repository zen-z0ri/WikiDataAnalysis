/**
 * Created by tung on 12/05/17.
 */
let express = require('express');
let controller = require('../controllers/analy.server.controller');

let router = express.Router();

router.get('/',controller.showPage); //url path

router.get('/getTitle', controller.getTitle);
//ajax to find the info of several feature
router.get('/revNumArticle', controller.revNumArticle);
router.get('/registerNumArticle', controller.registerNumArticle);
router.get('/historyArticle', controller.historyArticle);
//full set figs
router.get('/fullUserData', controller.fullUserData);
// router.post('/mostResisterUserArticle', controller.mostResisterUserArticle);
// router.post('/lastResisterUserArticle', controller.lastResisterUserArticle);
// router.post('/longHistoryArticle', controller.longHistoryArticle);
// router.post('/shortHistoryArticle', controller.shortHistoryArticle);

module.exports = router;