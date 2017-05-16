/**
 * Created by tung on 12/05/17.
 */
let AnalyWiki = require('../models/analy.js');
function showPage(req,res){
    res.render('fullPage.pug');
};
function getTitle(req,res){
    let sKey = req.query.key;
    console.log(sKey);
    AnalyWiki.searchT(sKey,(err,result)=>{
        if(err) console.log("error happened at search titile");
        else {
            console.log(result);
            res.send(JSON.stringify(result));
            res.end();
        }
    });
};
module.exports.showPage = showPage;
module.exports.getTitle = getTitle;
