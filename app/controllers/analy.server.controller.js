/**
 * Created by tung on 12/05/17.
 */
let analy = require('../models/analy');
function getTime2Time(time1, time2)
{
    time1 = Date.parse(time1)/1000;
    time2 = Date.parse(time2)/1000;
    var time_ = time1 - time2;
    return (time_/(3600*24));
};
function checkDB(){};
function showPage(req,res){
    res.render('fullPage.pug');
};
function pullDB(req,res){
    let reqD = new Date();
    let dbPullD = req.locals.dbPullD;
    if(getTime2Time(reqD,dbPullD)>1) {
        dbPullD = reqD;
        res.render('fullPage.pug',{dbPullD:dbPullD});
    }else{
        checkDB();
        res.render('fullPage.pug',{});
    }

};
module.exports.showPage = showPage;
module.exports.pullDB = pullDB;
