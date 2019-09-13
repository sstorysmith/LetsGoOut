//custom JS here
$(document).ready(function(){
    // event brite API Key: NYPPF5ZFS2WQZMMQSIJJ
    // Fandango API Key: 7sys79jddrrq8m26yucpf7zb  Secret: hGK9N44PtU
    // Yelp API API Key: v03Ra_pyFmjsGUIHM7Io4Mzr7YsVegkePN7fYapQQcV53mJSEubRnBy9QwI2cTajhrX6y9KTslu8wKUEAuObukAOCmrXVD04EDsS6Cx3kBhfcrHMOFulo5L2hQl4XXYx
    // yelp Client ID: zVbgUN-sk5xSJD8EtB2CCQ
    // google Maps API Key: AIzaSyAS_aRmkWhE3-tHwQMKta0odrvWrEXv4Kw
    $("#submit").on("click", function(e){
        e.preventDefault();
        searchEventBrite();
    })
 
});

function searchEventBrite() {
    let location = $("#location").val().trim()
    const queryURL = "https://private-anon-15caf22989-eventbriteapiv3public.apiary-proxy.com/v3/events/search/?token=NYPPF5ZFS2WQZMMQSIJJ&location.address=" + location + "&location.within=20mi&start_date.keyword=today"
 
    $.ajax({
        type: 'GET',
        url: queryURL,
        dataType: "json",

    }).done(function(data) { 
        console.log(data);
    });

}