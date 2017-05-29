/**
 * Created by tung on 12/05/17.
 */
let AnalyWiki = require('../models/analy.js');
let url = require('url');
// let qs = require('querystring');
let request = require('request');


//render page
let showPage = (req,res) => res.render('fullPage.pug');
//get title in the db for search box
function getTitle(req,res){
    let sKey = req.query.sText;
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
function fullSetUserData(req,res, title) {
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
                }, title);
            }, title);
        }, title);
    }, title);
};

//check the two time gap
function daysBetween(time1, time2) {
    return (time1-time2)/(3600*24*1000);
}

function articleFetch(req,res){
    let title = req.query.sText;
    console.log("search title "+title);
    AnalyWiki.lastRevisionTime((err,result)=>{
        if(err) console.log("error happened at search titile");
        else {
            if (result.length>0){
                let current = new Date();
                console.log('The last revision is at '+result[0].timestamp);
                let lastTime = new Date(Date.parse(result[0].timestamp));
                if(daysBetween(current, lastTime)>1){
                    console.log(title+" is out of date");
                    AnalyWiki.requestWiki(title, lastTime, function () {
                        if(revisions.length === 0){
                            console.log("It's already up to date");
                            fullSetUserData(req,res, title);
                        }else{
                            revisions.forEach((ele) =>{
                                ele.title = title;
                            });
                            AnalyWiki.insertMany(revisions);
                            res.send("There are " + revisions.length + " revisions insert.");
                            console.log("There are " + revisions.length + " revisions insert.");
                            res.end();
                        }
                    });
                }else{
                    fullSetUserData(req,res, title);
                    console.log("The DB is up to date.")
                }
            }else console.log("Not valid titile");
        }
    }, title);
};

function individualArticleData(req, res){

}
module.exports={
    showPage:showPage,
    getTitle:getTitle,
    eachArticleRevisionNum:eachArticleRevisionNum,
    registerUserEachArticle:registerUserEachArticle,
    historyForArticle:historyForArticle,
    fullSetUserData:fullSetUserData,
    articleFetch:articleFetch
};

