/**
 * Created by tung on 12/05/17.
 */
let AnalyWiki = require('../models/analy.js');
let url = require('url');
let qs = require('querystring');

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
function eachArticleRevisionNum(req,res) {
    AnalyWiki.eachArticleRevisionNum((err,result)=>{
        if(err) console.log(err.message);
        else {
            res.send(result);
            res.end();
        }
    });
};
function registerUserEachArticle(req,res) {
    AnalyWiki.registerUserEachArticle((err,result)=>{
        if(err) console.log(err.message);
        else {
            res.send(result);
            res.end();
        }
    });
};
function historyForArticle(req,res) {
    AnalyWiki.historyForArticle((err,result)=>{
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
function fullSetUserData(req,res) {
    res.writeHead(200, {"Content-Type": "text"});
    AnalyWiki.adminStatistic((err,result)=> {
        if (err) console.log(err.message);
        else res.write(JSON.stringify(result)+'|');
        AnalyWiki.botStatistic((err,result)=> {
            if (err) console.log(err.message);
            else res.write(JSON.stringify(result)+'|');
            AnalyWiki.normalUserStatistic((err,result)=> {
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
    eachArticleRevisionNum:eachArticleRevisionNum,
    registerUserEachArticle:registerUserEachArticle,
    historyForArticle:historyForArticle,
    fullSetUserData:fullSetUserData
    // lastRevArticle:lastRevArticle,
    // mostResisterUserArticle:mostResisterUserArticle,
    // lastResisterUserArticle:lastResisterUserArticle,
    // longHistoryArticle:longHistoryArticle,
    // shortHistoryArticle:shortHistoryArticle
};

