/**
 * Created by tung on 12/05/17.
 */
let express = require('express');
let controller = require('../controllers/analy.server.controller');
let router = express.Router();

/**
 * render page
 */
router.get('/',controller.showPage);
/**
 * For search box to search letters
 */
router.get('/getTitle', controller.getTitle);
/**
 * Three methods to show the text static of full set
 */
router.get('/revNumArticle', controller.eachArticleRevisionNum);
router.get('/registerNumArticle', controller.registerUserEachArticle);
router.get('/historyArticle', controller.historyForArticle);
/**
 * To show the full set static figs
 */
router.get('/fullUserData', controller.fullSetUserData);
//f
router.get('/searchArticle', controller.articleFetch);
module.exports = router;