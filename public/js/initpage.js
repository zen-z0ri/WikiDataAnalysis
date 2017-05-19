/**
 * 1.initial page script
 * 2.tung extend funcitons for reactive page
 */
function MosReBar() {
    $
}
function MosRePie() {

}
function leastRevBar() {
    
}
function leastRevPie() {

}
$(document).ready(function() {
    //https://github.com/alvarotrigo/fullPage.js
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#ccddff', '#FFC1C1', '#EE9090','#C85B5B'],
        anchors: ['helloPage', 'mostRev', 'leastRev', 'largeUserR', 'smallUserR', 'longHistory', 'shortHisory'],
        menu: '#menu',
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
                    infoBox.append("<p>" + msg[i]._id + "</p>");
                }
                // msg.map(ele=>infoBox.append("<p>" + msg[i]._id + "</p>"));
            }
        });
    });
    //rend the full-set analysis and figs


});
$(document).on('click','#infoBox p',function(){
    $('#sText').val($(this).html());
    $(this).parent('#infoBox').fadeToggle("slow");
});
