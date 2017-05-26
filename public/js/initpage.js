/**
 * Created by tung on 12/05/17.
 */
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['bar']});

//data for figs
var allBarData;
var allPieData;
var indiviBarData;
var indiviPieData;
var userRevBarData;
/**
 * Process data for correct format of bar chart
 * to four type users by year
 * @param info The Array of four infomation JSON array
 * each of them shows a type of user by static year
 * @returns {Array}
 * From [admin:{2001,num},{2002,num}...],
 *      [bot:{2001,num},{2002,num}...],
 *      [regular:{2001,num},{2002,num}...],
 *      [anon:{2001,num},{2002,num}...]
 * To [ ['Years', 'admin', 'bot', 'regular', 'anon'],
 *      ['2001', 'num', 'num', 'num', 'num'],
 *      ['2002', 'num', 'num', 'num', 'num'],...]
 */
function formatDataByTime(info) {
    //find the range of the year
    let minY = Math.min(info[0][0]._id,
        info[1][0]._id,
        info[2][0]._id,
        info[3][0]._id);
    let maxY = Math.max(info[0][info[0].length-1]._id,
        info[1][info[1].length-1]._id,
        info[2][info[2].length-1]._id,
        info[3][info[3].length-1]._id);
    //data is the OUTPUT
    let data = [];
    for (let i = minY; i <= maxY; i++ ){
        data.push([i.toString(10)]);
    }
    /**
     * For each json array of four type user
     * for each year
     * put the num into the correct pace of data
     */
    info.forEach((jsonArr,idx) => {
        jsonArr.forEach((ele,eIdx) =>{
            for (let i = 0; i < data.length; i++) {
                if (ele._id == data[i][0]) {
                    data[i][idx+1]=ele.count;
                }
            }
        });
    });
    // set the header
    data.unshift(['Years', 'admin', 'bot', 'regular', 'anon']);
    return data;
};
/**
 * Process data for correct format of pie chart
 * to four type users by year
 * @param info The Array of four infomation JSON array
 * each of them shows a type of user by static year
 * @returns {Array}
 * From [admin:{2001,num},{2002,num}...],
 *      [bot:{2001,num},{2002,num}...],
 *      [regular:{2001,num},{2002,num}...],
 *      [anon:{2001,num},{2002,num}...]
 * To [['UserType', 'number'],
 *     ['admin', totalNum],
 *     ['bot', totalNum],
 *     ['regular', totalNum],
 *     ['anon', totalNum]];
 */
function formatDataToSum(info) {
    let data = [['UserType', 'number'],
        ['admin'],
        ['bot'],
        ['regular'],
        ['anon']];
    info.forEach((jsonArr, idx) =>{
       // data[idx+1].push(
        let sum = 0;
        for(let ele of jsonArr){
           sum += ele.count;
        }
        data[idx+1].push(sum);
    });
    return data;
}
/**
 * DOCUMENT READY
 */
$(document).ready(function() {
    //set the full page module
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3'],
        anchors: ['helloPage', 'mostRev'],
        menu: '#menu',
        lockAnchors: false,
        navigation: false,
        scrollingSpeed: 700
    });
    // search bar
    $('#sText').keyup(function() {
        let key = { sText: $(this).val() };
        let infoBox = $('#infoBox');
        infoBox.show();
        $.ajax({
            type: "get",
            dataType: "json",
            url: "/getTitle",
            data: key,
            success: function (msg) {
                infoBox.html('');
                for (let i = 0; i < msg.length; i++) {
                    infoBox.append("<p class='titSelect'>" + msg[i]._id + "</p>");
                }
            }
        });
    });
    //rend the full-set text statics
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/revNumArticle",
        success: function (msg) {
            let info = $('.revNum');
            let a = msg[0];
            let b = msg[msg.length-1];
            info.html('');
            info.append("<p >1.The article with the most number of revisions:<br/>  <span>"
                + a._id
                + "</span> <br/>Revision number: <span>"
                + a.revNum
                + "</span></p>");
            info.append("<p >2.The article with the least number of revisions:<br/>  <span>"
                + b._id
                + "</span> <br/>Revision number: <span>"
                + b.revNum
                +"</span></p>");
        }
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/registerNumArticle",
        success: function (msg) {
            let info = $('.registerUser');
            let a = msg[0];
            let b = msg[msg.length-1];
            info.append("<p >3.The article edited by largest group of registered users:<br/>  <span>"
                + a._id
                + "</span> <br/>User number: <span>"
                + a.uniqueUserCount
                +"</p>");
            info.append("<p >4.The article edited by smallest group of registered users:<br/>  <span>"
                + b._id
                + "</span> <br/>User number: <span>"
                + b.uniqueUserCount
                +"</p>");
        }
    });
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/historyArticle",
        success: function (msg) {
            let info = $('.history');
            let a = msg[0];
            let b = msg[msg.length-1];
            info.append("<p >5.The article with the shortest history:<br/>  <span>"
                + a._id
                + "</span> <br/>Start from: <span>"
                + a.firRev.toString().slice(0,10)
                +"</span></p>");
            info.append("<p >6.The article with the longest history:<br/>  <span>"
                + b._id +"</span> <br/>Start from: <span>"
                + b.firRev.toString().slice(0,10)
                +"</span></p>");
        }
    });
    /**
     * get the data from the full set four type users
     * Parse it from string to a array includes four JSON arrays
     * and trans these data to the Google chart accept format
     */
    $.ajax({
        type: "get",
        dataType: "text",
        url: "/fullUserData",
        success: function (msg) {
            msg = msg.split('|');
            let info = [];
            msg.forEach(
                (ele,idx) => {info[idx] = JSON.parse(ele)
            });
            allBarData = formatDataByTime(info);
            allPieData = formatDataToSum(info);
        }
    });
    //plot two figs of full set level
    $('#fullset-bar').click(function (event) {
        event.preventDefault();
        let visData = google.visualization.arrayToDataTable(
            allBarData
        );
        let options = {
            chart: {
                title: 'Total static'
            },
            'width':600,
            'height':480,
            backgroundColor: '#4BBFC3',
            chartArea:{
                backgroundColor: '#4BBFC3'
            },
            hAxis: {
                textStyle:{color: '#ffffff'}
            }
        };
        let chart = new google.charts.Bar($("#fullInfo-bar")[0]);
        chart.draw(visData, google.charts.Bar.convertOptions(options));
    });
    $('#fullset-pie').click(function (event) {
        event.preventDefault();
        let visData = google.visualization.arrayToDataTable(
            allPieData
        );
        let options = {
            chart: {
                title: 'Total static'
            },
            'width':600,
            'height':480,
            backgroundColor: '#4BBFC3',
            hAxis: {
                textStyle:{color: '#ffffff'}
            }
        };
        let chart = new google.visualization.PieChart($("#fullInfo-bar")[0]);
        chart.draw(visData, options);
    });
});

/**
 *Log: the dynamic extend html need to rebind the event!
 *Ref:http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements
 */
$(document).on('click','.titSelect',function(){
    $('#sText').val($(this).html());
    $(this).parent('#infoBox').fadeToggle("slow");
});
