/**
 * Created by tung on 12/05/17.
 */

import AnalyWiki from '../models/analy';

//render page
const showPage = (req,res) => res.render('fullPage.pug');
/**
 * get title in the db for search box
 * @param req
 * @param res
 */
const getTitle = (req,res) => {
  let sKey = req.query.sText;
  AnalyWiki.searchTitle(sKey,(err,result)=>{
    if(err) console.log("error happened at search titile");
    else {
      res.send(result);
      res.end();
    }
  });
}
// Three methods get the full set statistic result for Text
const eachArticleRevisionNum = (req,res) => {
  AnalyWiki.eachArticleRevisionNum((err,result)=>{
    if(err) console.log(err.message);
    else {
      res.send(result);
      res.end();
    }
  });
}
const registerUserEachArticle = (req,res) => {
  AnalyWiki.registerUserEachArticle((err,result)=>{
    if(err) console.log(err.message);
    else {
      res.send(result);
      res.end();
    }
  });
}
const historyForArticle = (req,res) => {
  AnalyWiki.historyForArticle((err,result)=>{
    if(err) console.log(err.message);
    else {
      res.send(result);
      res.end();
    }
  });
}

/**
 * If have title, send the  four type user of a
 * individual title;
 * if don't have title send the four types user
 * full set static for the overall data
 * @param req
 * @param res
 * @param title
 * @returns {Promise.<void>}
 */
const fullSetUserData = async (req, res, title) => {
  res.writeHead(200, {"Content-Type": "text"});
  await AnalyWiki.adminStatistic((err,result) => {
    if (err) console.log(err.message);
    else res.write(JSON.stringify(result) + '|');
  }, title);
  await AnalyWiki.botStatistic((err,result) => {
    if (err) console.log(err.message);
    else res.write(JSON.stringify(result) + '|');
  }, title);
  await AnalyWiki.normalUserStatistic((err,result) => {
    if (err) console.log(err.message);
    else res.write(JSON.stringify(result) + '|');
  }, title);
  await AnalyWiki.anonStatistic((err,result) => {
    if (err) console.log(err.message);
    else res.write(JSON.stringify(result));
  }, title);
  res.end();
}

//check the two time gap
const daysBetween = (time1, time2) => {
  return (time1-time2)/(3600*24*1000);
}

/**
 * used to the write individual article total revision
 * number and TOP 5 users
 * @param res
 * @param title
 * @param revisions
 * @returns {Promise.<void>}
 */
const writeData = async (res, title, revisions) => {
  res.writeHead(200, {"Content-Type": "text"});
  res.write(title+'|'+revisions.length+'|');
  await AnalyWiki.eachArticleRevisionNum((err, result) =>{
    if (err) console.log(err.message);
    else  res.write(JSON.stringify(result)+'|');
  }, title);
  await AnalyWiki.topUser(title, (err, result) => {
      if (err) console.log(err.message);
      else res.write(JSON.stringify(result));
  })
  res.end();
}
/**
 * use @AnalyWiki.lastRevisionTime to check the lastRevision
 * of individual, if out of data, use @AnalyWiki.requestWiki
 * to request the third party data, then, use the write data
 * to send message
 * @param req
 * @param res
 */
const articleFetch = (req,res) => {
  //search text
  let title = req.query.sText;
  console.log("search title "+title);
  //check if the last revision have passed the out-date-threshold (24over)
  AnalyWiki.lastRevisionTime((err,result)=>{
    if(err) console.log("error happened at search title");
    else {
      if (result.length>0){
        let current = new Date();
        console.log('The last revision is at '+result[0].timestamp);
        let lastTime = new Date(Date.parse(result[0].timestamp));
        // out of date
        if(daysBetween(current, lastTime)>1){ 
          console.log(title+" is out of date");
          AnalyWiki.requestWiki(title, lastTime, function (revisions) {
            // but no new revision at wiki
            if(revisions.length === 0){
              console.log("It's already up to date");
              writeData(res, title, revisions);
            }else{
              revisions.forEach((ele) =>{
                ele.title = title;
              });
              AnalyWiki.insertMany(revisions);
              writeData(res, title, revisions);
            }
          });
        }else{ //not out of date
          AnalyWiki.requestWiki(title, lastTime, function () {
            writeData(res, title, revisions);
            console.log("The DB is up to date.")
          });
        }
      }else {
        console.log("Not valid title");
        res.send("Not valid title");
        res.end();
      }
    }
  }, title);
}
/**
 * use to send to send a individual article static
 * of four types users and so on.
 * @fullSetUserData method specify a title for individual
 * @param req
 * @param res
 */
const individualArticleData = (req, res) =>{
  let title = req.query.sText;
  console.log("Get data of: "+title);
  fullSetUserData(req, res, title);
}
/**
 * use to send a static of a single user for
 * a single article
 * @param req
 * @param res
 */
const userStatic = (req, res) => {
  let title = req.query.title;
  let user = req.query.user;
  AnalyWiki.individualUserStatic(title, user, (err, result) => {
    if (err) console.log(err.message);
    else  res.send(result);
  });
}
module.exports={
  showPage,
  getTitle,
  eachArticleRevisionNum,
  registerUserEachArticle,
  historyForArticle,
  fullSetUserData,
  articleFetch,
  individualArticleData,
  userStatic
};

