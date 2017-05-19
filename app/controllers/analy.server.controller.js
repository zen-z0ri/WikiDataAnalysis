/**
 * Created by tung on 12/05/17.
 */
let AnalyWiki = require('../models/analy.js');
let url = require("url");
let qs = require("querystring");
function showPage(req,res){
    res.render('fullPage.pug');
};
function getTitle(req,res){
    let sKey = qs.parse(url.parse(req.url).query).sText;
    AnalyWiki.searchT(sKey,(err,result)=>{
        if(err) console.log("error happened at search titile");
        else {
            res.send(result);
            res.end();
        }
    });
};
function getMosReInfo(req,res) {
    AnalyWiki.MosRe(

    );

};
module.exports={
    showPage:showPage,
    getTitle:getTitle
};

