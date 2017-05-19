/**
 * Created by tung on 12/05/17.
 */
/*
 * 1. in node.js, the path of require() is always anchor in
 *      the current module's working dir
 * 2. however, the others functions require path, like readFile() below,
 *      is anchor in the run time dir: in the example: server.js dir
 *      (think about it)
 *      we can test use: console.log(cwd());
 * 3. in express, we can do:
 *      app.set('views', path.join(__dirname,'app/views'));
 *     that set the 'views' variable. when
 *      res.render(view, data)
 *     it search under this 'views' variable
 * 4. in express, we also do:
 *      app.use(express.static(path.join(__dirname, 'public')));
 *     that set the static variable. when the tamplate need contain
 *     CSS or js... it search under this 'express.static' variable
 *
 */
let mongoose = require('./db');
let fs = require('fs');

// let readList =(fPath)=>fs.readFile(fPath, 'utf8', (err, fd) => {
//     if (err) {
//         console.error(fPath+'does not exist');
//     }
//     return fd.toString().split("\n");
// });
// let botList = readList('./bot.txt');
//
let readList =(fPath)=>fs.readFile(fPath, 'utf8', (err, fd) => {
    if (err) {
        console.error(fPath+'does not exist');
    }
    console.log(fd.toString().split('\n'));
});
let botList = readList('bot.txt');
let admList = readList('admin.txt');
console.log( process.cwd());
//define the schema
let AnalySchema = new mongoose.Schema(
    {title: String,
        timestamp: String,
        user: String,
        anon: String},
    {
        versionKey: false
    });

//define the methods
AnalySchema.statics.searchT = function (title, callback) {
    let reg = '^'+title+'.*';
    let treg = new RegExp(reg,'i');
    return this.aggregate([
        {$match:{'title':treg}},
        {$group:{'_id':"$title"}},
        {$sort:{'title':-1}},
        {$limit:5}
    ]).exec(callback);
};


// AnalySchema.statics.getMosRe = function (callback) {
//         return this.
// }
//use and export model
let AnalyWiki = mongoose.model('AnalyWiki', AnalySchema, 'revisions');
module.exports = AnalyWiki;