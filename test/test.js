/**
 * Created by tung on 13/05/17.
//  */
// function getTime2Time(time1, time2)
// {
//     time1 = Date.parse(time1)/1000;
//     time2 = Date.parse(time2)/1000;
//     var time_ = time1 - time2;
//  console.log(time_/(3600*24));
// }
// // getTime2Time(Date.now(), new Date(Date.parse('2016-10-25 09:00:29.000Z')));
// let t1 = new Date();
// console.log(t1.toISOString());
// let t2 = new Date(Date.parse('2017-5-28 09:00:29.000Z'));
// console.log(t2);
// console.log((t2-t1)/(3600*1000*24));
// function pullDB(req,res){
//     // let title = req.query.title;
//     // Revision.findTitleLatestRev(title, (err,result)=>{
//     //     if (err) console.log('Cannot find ' + title + "'s latest revision!");
//     //     console.log(result);
//     //     revision = result[0];
//     //     res.render('revision.pug',{title: title, revision:revision});
//     // });
//     let reqD = new Date();
//     console.log(reqD);
//     let dbPullD = new Date(2017, 4, 4);
//     console.log(dbPullD);
//     console.log(reqD-dbPullD/(1000*3600*24));
//     console.log(getTime2Time(reqD,dbPullD));
// };
//
// pullDB(t1);
// let wikiEndpoint = 'https://en.wikipedia.org/w/api.php';
// let parameters =  ["action=query",
//     "format=json",
//     "prop=revisions",
//     "titles=Adrian Cole (RAAF officer)",
//     "rvstart=2016-11-01T11:56:22Z",
//     "rvdir=newer",
//     "rvlimit=max",
//     "rvprop=timestamp|userid|user|ids"];
// var url = wikiEndpoint + "?" + parameters.join("&");
// console.log(url);
//     ti = "Adrian Cole (RAAF officer)";
// ti = ti.trim().split(' ').join('\%20');
//
// console.log(ti);
// let request = require('request');
// function requestWiki(tit, rvstart) {
//     tit = tit.trim().split('\s').join("\%20");
//     console.log(tit)
//     let wikiEndpoint = 'https://en.wikipedia.org/w/api.php';
//     let titStr = "titles="+tit;
//     let rvstartStr = "rvstart="+rvstart;
//     let parameters = ["action=query",
//         "format=json",
//         "prop=revisions",
//         "rvdir=newer",
//         "rvlimit=max",
//         "rvprop=timestamp|userid|user|ids|title"];
//     parameters.push(titStr,rvstartStr);
//     let url = wikiEndpoint + "?" + parameters.join("&");
//     console.log(url);
//     let options = {
//         url: url,
//         Accept: 'application/json',
//         'Accept-Charset': 'utf-8'
//     }
//     request(options, function (err, res, data) {
//         if (err) {
//             console.log('Error:', err);
//         } else if (res.statusCode !== 200) {
//             console.log('Status:', res.statusCode);
//         } else {
//             json = JSON.parse(data);
//             console.log(json.query.pages)
//             pages = json.query.pages;
//
//             revisions = pages[Object.keys(pages)[0]].revisions;//json array
//             console.log("There are " + JSON.stringify(revisions[0])+" revisions.");
//
//
//             // console.log("The revisions are made by " + uniqueUsers.size + "unique users");
//         }
//     });
// };
// requestWiki("Adrian Cole (RAAF officer)", "2016-10-25T09:00:29.000Z")
var trep = new RegExp("^Adrian.Cole.(RAAF officer)$");
console.log(trep.toString())