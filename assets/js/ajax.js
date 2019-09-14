//custom JS here.
$(document).ready(function(){
    // event brite API Key: NYPPF5ZFS2WQZMMQSIJJ
    // Fandango API Key: 7sys79jddrrq8m26yucpf7zb  Secret: hGK9N44PtU
    // Yelp API API Key: v03Ra_pyFmjsGUIHM7Io4Mzr7YsVegkePN7fYapQQcV53mJSEubRnBy9QwI2cTajhrX6y9KTslu8wKUEAuObukAOCmrXVD04EDsS6Cx3kBhfcrHMOFulo5L2hQl4XXYx
    // yelp Client ID: zVbgUN-sk5xSJD8EtB2CCQ
    // google Maps API Key: AIzaSyAS_aRmkWhE3-tHwQMKta0odrvWrEXv4Kw
    // TMS Movie API api Key: a5ht9r228dugghx2hf2cn7qa 
    $("#submit").on("click", function(e){
        e.preventDefault();
        searchEventBrite();
        searchYelp();
        searchMovies();
    })
 
});
//global variables 
let restaurantName;
let restaurantImage_url;
let restaurant_url;

let eventName;
let eventDescription;
let eventStart;
let eventEnd;
let eventUrl;
let eventimageUrl;

let movieName;
let movieDescription;
let movieRating;
let posterURL;
let movieTicketURL


function searchEventBrite() {
    let location = $("#location").val().trim()
    const queryURL = "https://private-anon-15caf22989-eventbriteapiv3public.apiary-proxy.com/v3/events/search/?token=NYPPF5ZFS2WQZMMQSIJJ&location.address=" + location + "&location.within=20mi&start_date.keyword=today&categories=103"
 
    $.ajax({
        type: 'GET',
        url: queryURL,
        dataType: "json",

    }).done(function(data) { 
       
        console.log("Event Brite");
        console.log(data.events);
        const response = data.events;
        //picks random event from the 50 it returns [EVENT BRITE]
         let randomEvent = Math.floor(Math.random() * data.events.length + 1)
            eventName = response[randomEvent].name.text;
            eventDescription = response[randomEvent].description.text;
            eventStart = response[randomEvent].start.local;
            eventEnd = response[randomEvent].end.local;
            eventUrl = response[randomEvent].url;
            eventimageUrl = response[randomEvent].logo.original.url

            console.log(eventName);
            console.log(eventDescription);
            console.log(eventStart);
            console.log(eventEnd);
            console.log(eventUrl)
            console.log(eventimageUrl)

    });


}

function searchYelp() {
    let location = $("#location").val().trim()
    const queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}?limit=20?open_now=true?categories=restaurants`
 
    $.ajax({
        url: queryURL,
        headers: {
         'Authorization':'Bearer v03Ra_pyFmjsGUIHM7Io4Mzr7YsVegkePN7fYapQQcV53mJSEubRnBy9QwI2cTajhrX6y9KTslu8wKUEAuObukAOCmrXVD04EDsS6Cx3kBhfcrHMOFulo5L2hQl4XXYx',
     },
        method: 'GET',
        dataType: 'json',
        success: function(data){
            const response = data.businesses;

               //picks random restaurant from the 50 it returns [YELP]
            let randomRestaurant = Math.floor(Math.random() * response.length + 1);
            restaurantName = response[randomRestaurant].name;
            restaurant_url = response[randomRestaurant].url;
            restaurantImage_url = response[randomRestaurant].image_url;


            console.log(restaurantName);
            console.log(restaurant_url);
            console.log( restaurantImage_url);
    
        }
     });      
     

}

function searchMovies() {
    const today = new Date().toISOString().slice(0, 10);
    let location = $("#location").val().trim()
    const queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + today + "&zip=" + location + "&api_key=a5ht9r228dugghx2hf2cn7qa";
 
    $.ajax({
        type: 'GET',
        url: queryURL,
        dataType: "json",

    }).done(function(data) { 
        const response = data;
        console.log(response)
       
        //picks random Movie from however many new ones it returns [Movie API]
         let randomMovie = Math.floor(Math.random() * response.length + 1)
            movieName = response[randomMovie].title;
            movieDescription = response[randomMovie].shortDescription;
            posterURL = "https://cuso.tmsimg.com/" + response[randomMovie].preferredImage.uri 
            movieRating = response[randomMovie].ratings[0].code
            

         
            
            console.log(movieName);
            console.log(movieRating);
            console.log(movieDescription);
            console.log(posterURL);

            for(let i = 0; i < response[randomMovie].showtimes.length; i++){
                let theatre = response[randomMovie].showtimes[i].theatre.name;
                let showtimes = response[randomMovie].showtimes[i].dateTime;

                movieTicketURL = response[randomMovie].showtimes[i].ticketURI;
              
                console.log("Showtimes:")
                console.log(theatre)
                console.log(showtimes);
                console.log(movieTicketURL);
                
               }
        });


    }