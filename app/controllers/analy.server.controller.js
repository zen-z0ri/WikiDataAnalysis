/**
 * Created by tung on 12/05/17.
 */
let AnalyWiki = require('../models/analy.js');
let url = require('url');
let qs = require('querystring');
let async = require('async');

//render page
let showPage = (req,res) => res.render('fullPage.pug');
//get title in the db for search box
function getTitle(req,res){
    let sKey = qs.parse(url.parse(req.url).query).sText;
    AnalyWiki.searchTitle(sKey,(err,result)=>{
        if(err) console.log("error happened at search titile");
        else {
            res.send(result);
            res.end();
        }
    });
};
// get the full set statistic result
function revNumArticle(req,res) {
    AnalyWiki.revNumofArticle((err,result)=>{
        if(err) console.log(err.message);
        else {
            res.send(result);
            res.end();
        }
    });
};
// //
function registerNumArticle(req,res) {
    AnalyWiki.registerUserofArticle((err,result)=>{
        if(err) console.log(err.message);
        else {
            res.send(result);
            res.end();
        }
    });
};
// //
function historyArticle(req,res) {
    AnalyWiki.historyofArticle((err,result)=>{
        if(err) console.log(err.message);
        else {
            res.send(result);
            res.end();
        }
    });
};
/*
 *find the number of
 */
function changeDataFormat(jsonArr,data) {

    jsonArr.forEach(function (ele,idx){
        ele._id
    });
}
function fullUserPieChart(req,res) {
    res.writeHead(200, {"Content-Type": "text"});
    AnalyWiki.adminStatistic((err,result)=> {
        if (err) console.log(err.message);
        else res.write(JSON.stringify(result)+'|');
        AnalyWiki.botStatistic((err,result)=> {
            if (err) console.log(err.message);
            else res.write(JSON.stringify(result)+'|');
            AnalyWiki.registerUserStatistic((err,result)=> {
                if (err) console.log(err.message);
                else res.write(JSON.stringify(result)+'|');
                AnalyWiki.anonStatistic((err,result)=> {
                    if (err) console.log(err.message);
                    else res.write(JSON.stringify(result));
                    res.end();
                });
            });
        });
    });
};

module.exports={
    showPage:showPage,
    getTitle:getTitle,
    revNumArticle:revNumArticle,
    registerNumArticle,registerNumArticle,
    historyArticle,historyArticle,
    fullUserPieChart,fullUserPieChart
    // lastRevArticle:lastRevArticle,
    // mostResisterUserArticle:mostResisterUserArticle,
    // lastResisterUserArticle:lastResisterUserArticle,
    // longHistoryArticle:longHistoryArticle,
    // shortHistoryArticle:shortHistoryArticle
};

