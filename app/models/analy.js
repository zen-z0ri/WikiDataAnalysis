/**
 * Created by tung on 12/05/17.
 */
let mongoose = require('./db');
/*
 * define the methods of db
 */
let AnalySchema = new mongoose.Schema(
    {title: String,
        timestamp: String,
        user: String,
        anon: String},
    {
        versionKey: false
    });

AnalySchema.statics.pullDB = function(title, callback){
    return this.find({'title':title})
        .sort({'timestamp':-1})
        .limit(1)
        .exec(callback);
};
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
//     return this.
// }
// mongoose.model(modelName, schema, collection):
let AnalyWiki = mongoose.model('AnalyWiki', AnalySchema, 'revisions');
module.exports = AnalyWiki;