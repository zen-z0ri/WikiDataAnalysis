/**
 * 1.initial page script
 * 2.tung extend funcitons for reactive page
 */
google.charts.load('current', {'packages':['corechart']});
//data for figs
var allBarData;
var allPieData;
var indiviBarData;
var indiviPieData;
var userRevBarData;
//process data for

$(document).ready(function() {
    //https://github.com/alvarotrigo/fullPage.js
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#90ee90', '#ccddff', '#FFC1C1', '#EE9090','#C85B5B'],
        anchors: ['helloPage', 'mostRev'],
        menu: '#menu',
        lockAnchors: true,
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
    //rend the full-set text analysis
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
                + a.firRev.toString().slice(0,9)
                +"</span></p>");
            info.append("<p >6.The article with the longest history:<br/>  <span>"
                + b._id +"</span> <br/>Start from: <span>"
                + b.firRev.toString().slice(0,9)
                +"</span></p>");
        }
    });
    //full-set figs
    $.ajax({
        type: "get",
        dataType: "text",
        url: "/fullUserPieChart",
        success: function (msg) {
            msg = msg.split('|');
            let info = [];
            msg.forEach(
                (ele,idx) => {info[idx] = JSON.parse(ele)
            });
            for (let i of info){
                alert(i[0]._id);
            }
            //

        }
    });

});

/*
 *the dynamic extend html need to rebind the event!
 *Ref:http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements
 */
$(document).on('click','.titSelect',function(){
    $('#sText').val($(this).html());
    $(this).parent('#infoBox').fadeToggle("slow");
});

//rend the full-set figs
