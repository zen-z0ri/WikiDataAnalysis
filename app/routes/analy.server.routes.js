/**
 * Created by tung on 12/05/17.
 */
let express = require('express');
let controller = require('../controllers/analy.server.controller');

let router = express.Router();

router.get('/',controller.showPage); //url path

router.get('/getTitle', controller.getTitle);
//ajax to find the info of several feature
// router.get('/mosRe', controller.getMosReInfo);
// router.get('/leastRev', controller.getLeastRevInfo);
// router.get('/LGrou', controller.getLGrouInfo);
// router.get('/SGrou', controller.getSGrouInfo);
// router.get('/LHis', controller.getLHisInfo);
// router.get('/SHis', controller.getSHisInfo);
router.post('/getTextInfoForFull', controller.getTextInfoForFull);
module.exports = router;