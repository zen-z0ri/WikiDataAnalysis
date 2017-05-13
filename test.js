/**
 * Created by tung on 13/05/17.
 */
function getTime2Time(time1, time2)
{
    time1 = Date.parse(time1)/1000;
    time2 = Date.parse(time2)/1000;
    var time_ = time1 - time2;
    return (time_/(3600*24));
}
function pullDB(req,res){
    // let title = req.query.title;
    // Revision.findTitleLatestRev(title, (err,result)=>{
    //     if (err) console.log('Cannot find ' + title + "'s latest revision!");
    //     console.log(result);
    //     revision = result[0];
    //     res.render('revision.pug',{title: title, revision:revision});
    // });
    let reqD = new Date();
    console.log(reqD);
    let dbPullD = new Date(2017, 4, 4);
    console.log(dbPullD);
    console.log(reqD-dbPullD/(1000*3600*24));
    console.log(getTime2Time(reqD,dbPullD));
};

pullDB();