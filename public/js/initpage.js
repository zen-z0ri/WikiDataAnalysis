/**
 * 1.initial page script
 * https://github.com/alvarotrigo/fullPage.js
 * 2.tung extend funcitons for reactive page
 */
$(document).ready(function() {

    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ccddff', '#FFC1C1', '#EE9090','#C85B5B'],
        anchors: ['helloPage', 'mostRev', 'leastRev', 'largeUserR', 'smallUserR', 'longHistory', 'shortHisory'],
        menu: '#menu',
        navigation: false,
        scrollingSpeed: 1000
    });

    //search bar
    // $('#sText').keyup(function() {
    //
    //     $.ajax({type:'get',
    //         success: function(result){
    //             $("#div1").html(result);
    //         });
    //
    //     });
    // });
});