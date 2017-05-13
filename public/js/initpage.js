/**
 * initial page script
 * https://github.com/alvarotrigo/fullPage.js
 */

function show(){
    let mydate = new Date();
    let str = " " + mydate.getDate() + " / ";
    str += (mydate.getMonth()+1) + " / ";
    str += mydate.getFullYear();
    return str;
}

$(document).ready(function() {

    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ccddff', '#FFC1C1', '#EE9090','#C85B5B'],
        anchors: ['helloPage', 'mostRev', 'leastRev', 'largeUserR', 'smallUserR', 'longHistory', 'shortHisory'],
        menu: '#menu',
        navigation: false,
        scrollingSpeed: 1000
    });
    // $('#pullDB').click(function(){
    //     $('#dbDate').html(show());
    // });
});