/**
 * Created by tung on 12/05/17.
 */
let mongoose = require('./db');
let fs = require('./fs');

console.log(fs.botList.length); //[903]
console.log(fs.admList.length); //[576]

//define the schema
let AnalySchema = new mongoose.Schema(
    {title: String,
        timestamp: String,
        user: String,
        anon: String},
    {
        versionKey: false}
);

//use to search title for search box
AnalySchema.statics.searchTitle = function (title, callback) {
    let reg = '^'+title+'.*';
    let treg = new RegExp(reg,'i');
    return this.aggregate([
        {$match: {'title': treg} },
        {$group: {'_id': "$title"} },
        {$sort: {'title': -1} },
        {$limit: 5}
    ]).exec(callback);
};

/*
 * methods used in full set statistic
 */
//used to find the revision numbers statistic in full set
AnalySchema.statics.revNumofArticle = function (callback) {
    return this.aggregate([
        {$group: {
            _id: "$title",
            revNum: {$sum: 1}
        }},
        {$sort: {revNum: -1} }//large to small
    ]).exec(callback);
};
//used to find the article edited by registered users in full set
AnalySchema.statics.registerUserofArticle = function (callback) {
   return this.aggregate([
        {$match: {
            $and: [
                {user: {$nin: fs.botList} },
                {user: {$nin: fs.admList} },
                {anon: {$exists: false} }
            ]
        }},
        {$group: {
            _id: "$title",
            revNum: {$sum: 1}
        }},
        {$sort: {revNum: -1} }//large to small
    ]).exec(callback)
};
//used to find the history of the article in full set
AnalySchema.statics.historyofArticle = function (callback) {
    return this.aggregate([
        {$group: {
            _id: "$title",
            firRev: {$min: '$timestamp'}
        }},
        {$sort: {firRev: -1} },// fresh to long history
    ]).exec(callback);
};

/*
 * used to bar chart of revision number distribution
 * by year and by user type
 * year from the old to fresh
 * if both in admin and bot, treat as a bot
 */
// used to show the admin statistic (if both in admin and bot, treat as bot)
AnalySchema.statics.adminStatistic = function (callback) {
    return this.aggregate([
        {$match: {
            $and: [
                {user: {$in: fs.admList} },
                {user: {$nin: fs.botList} }
            ]
        }},
        {$project: {
            Year: {$substr: ["$timestamp", 0, 4] },
        }},
        {$group: {
            _id: "$Year",
            count: {$sum : 1}
        }},
        {$sort: {_id : 1} }
    ]).exec(callback);
};
//used to show the bot statistic
AnalySchema.statics.botStatistic = function (callback) {
    return this.aggregate([
        {$match: {
            user: {$in: fs.botList}
        }},
        {$project: {
            Year: {$substr: ["$timestamp", 0, 4] },
        }},
        {$group: {
            _id: "$Year",
            count: {$sum: 1}
        }},
        {$sort: {_id: 1} }
    ]).exec(callback);
};
//used to show the register user statistic
AnalySchema.statics.registerUserStatistic = function (callback) {
    return this.aggregate([
        {$match: {
            $and: [
                {user: {$nin: fs.botList} },
                {user: {$nin: fs.admList} },
                {anon: {$exists: false} }
            ]
        }},
        {$project: {
            Year: {$substr: ["$timestamp", 0, 4 ]},
        }},
        {$group: {
            _id: "$Year",
            count: {$sum: 1}
        }},
        {$sort: {_id: 1} }
    ]).exec(callback);
};
//used to show the anon statistic
AnalySchema.statics.anonStatistic = function (callback) {
    return this.aggregate([
        {$match: {
            anon: {$exists: true}
        }},
        {$project: {
            Year: {$substr: ["$timestamp", 0, 4] },
        }},
        {$group: {
            _id: "$Year",
            count: {$sum: 1}
        }},
        {$sort: {_id: 1} }
    ]).exec(callback);
};

/*
 * method used to display pie chart:
 * number distribution by user type across the whole data set.
 */
//sum of a array
let arraySum = arr => arr.reduce((acc, val) => (acc + val.count), 0);
//find the full distribution from four user classes
AnalySchema.statics.allUserStatistc = function () {
    let userStatistic = {
        "adminNum":0,
        "botNum":0,
        "registerUserNum":0,
        "anonNum":0
    }
    AnalyWiki.adminStatistic((err,result)=>{
        if(err) console.log(err.message);
        userStatistic.adminNum = arraySum(result);
        console.log(userStatistic.adminNum);
    });
    AnalyWiki.botStatistic((err,result)=>{
        if(err) console.log(err.message);
        userStatistic.botNum = arraySum(result);
        console.log(userStatistic.botNum);
    });
    AnalyWiki.registerUserStatistic((err,result)=>{
        if(err) console.log(err.message);
        userStatistic.registerUserNum = arraySum(result);
        console.log(userStatistic.registerUserNum);
    });
    AnalyWiki.anonStatistic((err,result)=>{
        if(err) console.log(err.message);
        userStatistic.anonNum = arraySum(result);
        console.log(userStatistic.anonNum);
    });

    return userStatistic;
}

//use model and export model
let AnalyWiki = mongoose.model('AnalyWiki', AnalySchema, 'revisions');
AnalyWiki.allUserStatistc();
module.exports = AnalyWiki;