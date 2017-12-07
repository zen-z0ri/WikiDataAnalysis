/**
 * Created by tung on 12/05/17.
 */
'use strict';
// Load the google charts
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['bar']});

//data for figs
let allBarData;
let allPieData;
let indiviBarData;
let indiviPieData;
let userRevBarData;

/**
 * Process data for correct format of bar chart
 * to four type users by year
 *
 * From [admin:  {2001,num}, {2002,num}...],
 *      [bot:    {2001,num}, {2002,num}...],
 *      [regular:{2001,num}, {2002,num}...],
 *      [anon:   {2001,num}, {2002,num}...]
 *
 * To [ ['Years', 'admin', 'bot', 'regular', 'anon'],
 *      ['2001',  'num',   'num', 'num',     'num'],
 *      ['2002',  'num',   'num', 'num',     'num'],...]
 *
 * @param info The Array of four infomation JSON array
 * each of them shows a type of user by static year
 * @returns {Array}
 *
 */
const formatDataByTime = (info) => {
  info = info.filter(ele => (ele.length>0));
  //find the range of the year
  let minY = info[0][0]._id;
  let maxY = info[0][info[0].length-1]._id;
  info.forEach(ele => {
    (ele[0]._id < minY) ? (minY = ele[0]._id) : (minY = minY);
    (ele[ele.length-1]._id > maxY) ? (maxY = ele[ele.length-1]._id) : (maxY = maxY);
  });
  //data is the OUTPUT
  // fill the years line
  let data = [];
  for (let i = minY; i <= maxY; ++i){
    data.push([i.toString(10)]);
  }
  /**
   * For each json array of four type user
   * for each year
   * put the num into the correct pace of data
   */
  info.forEach((jsonArr,idx) => {
    jsonArr.forEach((ele) =>{
      data.forEach((dEle, dIdx) => {
        if (ele._id === data[dIdx][0]) {
          data[dIdx][idx+1] = ele.count;
        }
      });
    });
  });
  // set the header and fill the array with 0 to format
  data.unshift(['Years', 'admin', 'bot', 'regular', 'anon']);
  data.forEach((ele) => {
    //fill the empty elements with 0
    if(ele.length<5){
      for(let i = 0, short = 5-ele.length; i < short; ++i){
        ele.push(0)
      }
    }
  });
  return data;
}
/**
 * Process data for correct format of pie chart
 * to four type users by year
 *
 * From [admin:  {2001,num}, {2002,num}...],
 *      [bot:    {2001,num}, {2002,num}...],
 *      [regular:{2001,num}, {2002,num}...],
 *      [anon:   {2001,num}, {2002,num}...]
 *
 * To [['UserType', 'number'],
 *     ['admin',    totalNum],
 *     ['bot',      totalNum],
 *     ['regular',  totalNum],
 *     ['anon',     totalNum]];
 *
 * @param info The Array of four infomation JSON array
 * each of them shows a type of user by static year
 * @returns {Array}
 *
 */
const formatDataToSum = (info) => {
  let data = [['UserType', 'number'],
              ['admin'],
              ['bot'],
              ['regular'],
              ['anon']];
  info.forEach((jsonArr, idx) =>{
    let sum = 0;
    for(let ele of jsonArr){
      sum += ele.count;
    }
    data[idx+1].push(sum);
  });
  return data;
}
/**
 * format the TOP user json to data array
 *
 * from: [{"_id":{"year":"2006","us":"user1"},"count":59},
 *        {"_id":{"year":"2007","us":"user2"},"count":26},...]
 *
 * to :  [ ['Years', 'user1', 'user2', 'user3', 'user4'],
 *       ['2001',    'num',   'num',   'num',   'num'],
 *       ['2002',    'num',   'num',   'num',   'num'],...]
 *
 * @param msg  is the user json data
 * @param user is the user array we want to fetch
 * @returns {[*]}
 */
const formatUserData = (msg, user) => {
  let a     = ['Year'];
  let head  = a.concat(user);
  let data  = [head];
  let dbody = [];
  msg.forEach(ele =>{
    dbody.push(ele._id.year);
    dbody.push(ele._id.us);
    dbody.push(ele.count);
  });
  let maxY = dbody[dbody.length-3];
  let minY = dbody[0];
  for (let i = minY; i <= maxY; ++i ){
    data.push([i.toString(10)]);
  }
  dbody.forEach((dbodyEle, dbodyIdx) => {
    user.forEach((userEle, userIdx) => {
	    //fill the empty elements with 0
      data.forEach((dataEle) => {
        if((dbodyEle === dataEle[0]) && (dbody[dbodyIdx+1] === userEle)){
          dataEle[userIdx+1]=dbody[dbodyIdx+2];
        }
      });
    });
  });
  let dLength = user.length+1;
	//fill the empty elements with 0
  data.forEach((ele) => {
    if(ele.length<dLength){
      for(let i = 0, short = dLength-ele.length; i < short; i++){
        ele.push(0)
      }
    }
  });
  return data;
}
/**
 * DOCUMENT READY
 */
$(document).ready(function() {
  //set the full page setting
  $('#fullpage').fullpage({
    sectionsColor:  ['#1BBC9B', '#4bbfc3'],
    anchors:        ['helloPage', 'mostRev'],
    menu:           '#menu',
    lockAnchors:    false,
    navigation:     false,
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
      url: "/searchTitle",
      data: key,
      success: function (msg) {
        infoBox.html('');
        for (let i = 0; i < msg.length; ++i) {
          infoBox.append("<p class='titSelect'>" + msg[i]._id + "</p>");
        }
      }
    });
  });
  // check if the article up to data, otherwise fetch new data
  $('#pullDB').click(function () {
    let tit = { sText: $('#sText').val() };
    let individual = $('#showIndividual');
    individual.append('<p> Getting the wiki... </p>');
    $.ajax({
      type: "get",
      dataType: "text",
      url: "/searchArticle",
      data: tit,
      success: function (msg) {
        msg = msg.split('|');
        $('#topUser').empty();
        individual.empty();
        individual.append("<p>Title: "+msg[0]+"</p>");
        individual.append("<p>New revisions get: "
                          +msg[1]
                          +"</p>");
        individual.append("<p>Total revision number: "
                          +JSON.parse(msg[2])[0].revNum
                          +"</p>");
        individual.append("<p>Top 5 users: </p>");
        let user = JSON.parse(msg[3]);
        for(let i of user){
          individual.append("<p style='text-decoration: underline;'>"
                            +i._id
                            +": "
                            +i.revNum
                            +"</p>");
          $('#topUser').append("<option>"+i._id+"</option>");
        }
        $.ajax({
          type: "get",
          dataType: "text",
          url: "/individualArticleData",
          data: tit,
          success: function (msg) {
            msg = msg.split('|');
            let info = [];
            msg.forEach(
              (ele,idx) => {info[idx] = JSON.parse(ele)}
            );
            indiviBarData = formatDataByTime(info);
            indiviPieData = formatDataToSum(info);
          }
        });
      },
      error: function () {
        individual.append('Invalid title !');
        setTimeout(function(){ individual.empty() }, 3000);
      }
    });
    $('#individual-1').mousedown();
  });
  /**
   * three button used to get the data and render figs;
   */
  $('#individual-1').click(function (event) {
    event.preventDefault();
    let visData = google.visualization.arrayToDataTable(
      indiviBarData
    );
    let options = {
      chart: {
        title: 'Individual static: '+$('#sText').val()
      },
      'width':550,
      'height':400,
      backgroundColor: '#1BBC9B',
      chartArea: {backgroundColor: '#1BBC9B'},
      hAxis: {textStyle: {color: '#000000'}}
    };
    let chart = new google.charts.Bar($("#individual-fig")[0]);
    chart.draw(visData, google.charts.Bar.convertOptions(options));
  });
  $('#individual-2').click(function (event) {
    event.preventDefault();
    let visData = google.visualization.arrayToDataTable(
      indiviPieData
    );
    let options = {
      chart: {title: 'Individual static: '+$('#sText').val()},
      'width':550,
      'height':400,
      backgroundColor: '#1BBC9B',
      hAxis: {textStyle: {color: '#ffffff'}}
    };
    let chart = new google.visualization.PieChart($("#individual-fig")[0]);
    chart.draw(visData, options);
  });
  $('#individual-3').click(function (event) {
    event.preventDefault();
    let key = {
      title: $('#sText').val(),
      user: $('#topUser').val()
    };
    if(key.user.length<1){
      alert("no user select");
    }
    $.ajax({
      type: "get",
      dataType: "json",
      url: "/userStatic",
      data: key,
      success: function (msg) {
        let user = key.user.sort();
        userRevBarData = formatUserData(msg, user);
        let visData = google.visualization.arrayToDataTable(
          userRevBarData
        );
        let options = {
          chart: {
            title: key.user+"'s revission static: "+key.title
          },
          'width':550,
          'height':400,
          backgroundColor: '#1BBC9B',
          chartArea: {backgroundColor: '#1BBC9B' },
          hAxis: {textStyle: {color: '#000000'}}
        };
        let chart = new google.charts.Bar($("#individual-fig")[0]);
        chart.draw(visData, google.charts.Bar.convertOptions(options));
      }
    });
  });
	/**
   * Find the max/min revision number article title
	 */
	$.ajax({
    type: "get",
    dataType: "json",
    url: "/revNumArticle",
    success: function (msg) {
      let info = $('.revNum');
      let maxRevNumArticle = msg[0];
      let minRevNumArticle = msg[msg.length-1];
      info.html('');
      info.append("<p >1.The article with the most number of revisions:"
                  + "<br/>  <span>"
                  + maxRevNumArticle._id
                  + "</span> "
                  + "<br/>Revision number: "
                  + "<span>"
                  + maxRevNumArticle.revNum
                  + "</span></p>");
      info.append("<p >2.The article with the least number of revisions:"
                  + "<br/>  <span>"
                  + minRevNumArticle._id
                  + "</span> "
                  + "<br/>Revision number:"
                  + " <span>"
                  + minRevNumArticle.revNum
                  +"</span></p>");
    }
  });
	/**
   * The article edited by largest group of registered users
   * The article edited by smallest group of registered users
	 */
  $.ajax({
    type: "get",
    dataType: "json",
    url: "/registerUserRevNumArticle",
    success: function (msg) {
      let info = $('.registerUser');
      let a = msg[0];
      let b = msg[msg.length-1];
      info.append("<p >3.The article edited by largest group of registered users:"
                  + "<br/>  <span>"
                  + a._id
                  + "</span> <br/>User number: <span>"
                  + a.uniqueUserCount
                  +"</p>");
      info.append("<p >4.The article edited by smallest group of registered users:"
                  + "<br/>  <span>"
                  + b._id
                  + "</span> <br/>User number: <span>"
                  + b.uniqueUserCount
                  +"</p>");
    }
  });
	/**
   * Find the max/min history of the article
	 */
	$.ajax({
    type: "get",
    dataType: "json",
    url: "/historyArticle",
    success: function (msg) {
      let info = $('.history');
      let minHistoryArticle = msg[0];
      let maxHistoryArticle = msg[msg.length-1];
      info.append("<p >5.The article with the shortest history:<br/>  <span>"
                  + minHistoryArticle._id
                  + "</span> <br/>Start from: <span>"
                  + minHistoryArticle.firRev.toString().slice(0,10)
                  +"</span></p>");
      info.append("<p >6.The article with the longest history:<br/>  <span>"
                  + maxHistoryArticle._id +"</span> <br/>Start from: <span>"
                  + maxHistoryArticle.firRev.toString().slice(0,10)
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
      backgroundColor: '#4bbfc3',
      chartArea: {backgroundColor: '#4bbfc3'},
      hAxis: {textStyle: {color: '#000000'}}
    };
    let chart = new google.charts.Bar($("#fullInfo-fig")[0]);
    chart.draw(visData, google.charts.Bar.convertOptions(options));
  });
  $('#fullset-pie').click(function (event) {
    event.preventDefault();
    let visData = google.visualization.arrayToDataTable(
      allPieData
    );
    let options = {
      chart: {title: 'Total static'},
      'width':600,
      'height':480,
      backgroundColor: '#4bbfc3',
      hAxis: {textStyle: {color: '#ffffff'} }
    };
    let chart = new google.visualization.PieChart($("#fullInfo-fig")[0]);
    chart.draw(visData, options);
  });
});
//search bar select and fade
$(document).on('click','.titSelect',function(){
  $('#sText').val($(this).html());
  $(this).parent('#infoBox').fadeToggle("slow");
});
