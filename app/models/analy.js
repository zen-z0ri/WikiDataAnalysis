/**
 * Created by tung on 12/05/17.
 */
let mongoose = require('./db');
let fs = require('./fs');

//define the schema
let AnalySchema = new mongoose.Schema(
    {title: String,
        timestamp: String,
        user: String,
        anon: String},
    {versionKey: false}
);

/**
 * Used to search title for search box
 * @param title It's the letters that user enter to search
 * @param callback
 * @returns {Promise}
 */
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

/**
 * Methods used in full set statistic
 */
/**
 * Used to find the revision numbers statistic in full set
 * of each article
 * @param callback
 * @returns {Promise}
 */
AnalySchema.statics.eachArticleRevisionNum = function (callback) {
    return this.aggregate([
        {$group: {
            _id: "$title",
            revNum: {$sum: 1}
        }},
        {$sort: {revNum: -1} }//large to small
    ]).exec(callback);
};
/**
 * Used to find the article edited by registered users in full set
 * registered users: is the users are not anons
 * @param callback
 * @returns {Promise}
 */
AnalySchema.statics.registerUserEachArticle = function (callback) {
   return this.aggregate([
       {$match: {
           $and: [
               // {user: {$nin: fs.botList} },
               // {user: {$nin: fs.botList} },
               {anon: {$exists: false} }
           ]
       }},
       {$group: {
           _id: "$title",
           uniqUser: {$addToSet: "$user"}
       }},
       {$project: {"title": 1,
           uniqueUserCount: {$size: "$uniqUser"} } },
       {$sort: {uniqueUserCount: -1} }//large to small
   ]).exec(callback)
};
/**
 * Used to find the history of each article in full set
 * @param callback
 * @returns {Promise}
 */
AnalySchema.statics.historyForArticle = function (callback) {
    return this.aggregate([
        {$group: {
            _id: "$title",
            firRev: {$min: '$timestamp'}
        }},
        {$sort: {firRev: -1} },// fresh to long history
    ]).exec(callback);
};

/**
 * Methods used to full set revision static figs
 * by year and by four user types
 */
/**
 * Used to show the admin statistic
 * (if both in admin and bot, treat as admin)
 * @param callback
 * @returns {Promise}
 */
AnalySchema.statics.adminStatistic = function (callback) {
    return this.aggregate([
        {$match: {
            user: {$in: fs.admList}
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
/**
 * Used to show the bot statistic
 * (if both in admin and bot, treat as admin)
 * @param callback
 * @returns {Promise}
 */
AnalySchema.statics.botStatistic = function (callback) {
    return this.aggregate([
        {$match: {
            $and: [
                {user: {$nin: fs.admList} },
                {user: {$in: fs.botList} }
            ]
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
/**
 * Used to show the normal user statistic
 * normal user: (NOT admin)&&(NOT bot)&&(NOT anon)
 * @param callback
 * @returns {Promise}
 */
AnalySchema.statics.normalUserStatistic = function (callback) {
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
/**
 * Used to show the anons statistic
 * @param callback
 * @returns {Promise}
 */
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

//use model and export model
let AnalyWiki = mongoose.model('AnalyWiki', AnalySchema, 'revisions');

module.exports = AnalyWiki;