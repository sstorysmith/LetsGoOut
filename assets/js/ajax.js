//global variables 
let hungry; 
// let thirsty;
let movie;

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

$(document).ready(function(){
    // event brite API Key: NYPPF5ZFS2WQZMMQSIJJ
    // Fandango API Key: 7sys79jddrrq8m26yucpf7zb  Secret: hGK9N44PtU
    // Yelp API API Key: v03Ra_pyFmjsGUIHM7Io4Mzr7YsVegkePN7fYapQQcV53mJSEubRnBy9QwI2cTajhrX6y9KTslu8wKUEAuObukAOCmrXVD04EDsS6Cx3kBhfcrHMOFulo5L2hQl4XXYx
    // yelp Client ID: zVbgUN-sk5xSJD8EtB2CCQ
    // google Maps API Key: AIzaSyAS_aRmkWhE3-tHwQMKta0odrvWrEXv4Kw
    // TMS Movie API api Key: a5ht9r228dugghx2hf2cn7qa 

    $("#location").focus()
    $("#location").val(localStorage.getItem("location"));
    $("#submit").on("click", function(e){
        e.preventDefault();
        let location = $("#location").val().trim();
        let ziplength = $("#location").val().length;
      
        if(location == "" || ziplength < 5 || ziplength > 5 || $.isNumeric(location) == false){
            $("#validation").empty();
            $("#validation").append(`<span class="badge badge-danger">Please enter a valid 5-digit zip code (ex: 78759)</span>`)
            $("#location").focus()
        }else{
            localStorage.setItem("location", $("#location").val().trim())
            $("#homepage").empty();
            hungryQuestion();
        }
        // searchEventBrite();
        // searchYelp();
        // searchMovies();
    })
 
});




let hungryQuestion = function () {
    let yesBtn = `<button class="btn btn-md btn-primary" id="yes1">YES</button>`;
    let noBtn = `<button class="btn btn-md btn-danger" id="no1">NO</button>`;
    $("#homepage").hide();
    $("#questions-box").append("<h2>Are You Hungry?</h2>");
    $("#questions-box").append("<br>");
    $("#questions-box").append(yesBtn, noBtn);
    $('#yes1').on("click", function(){
        hungry = true;
        console.log(hungry);
        eventType();
    })
    $('#no1').on("click", function(){
        hungry = false;
        console.log(hungry);
        eventType();
    })
}

    let eventType = function () {
        let movieBtn = `<button class="btn btn-md btn-secondary" id="movie">Movie</button>`;
        let showBtn = `<button class="btn btn-md btn-secondary" id="show">Show</button>`;
        $("#questions-box").empty();
        $("#questions-box").append("<h2>Movie or a Show?</h2>");
        $("#questions-box").append("<br>");
        $("#questions-box").append(movieBtn, showBtn);
        $('#movie').on("click", function(){
            movie = true;
            console.log(movie)
            // displayFood();
            $("#questions-box").hide();
            searchMovies();
            if(hungry){
                searchYelp();
            }
    
        })
        $('#show').on("click", function(){
            movie = false;
            console.log(movie);
            // displayFood ();
            $("#questions-box").hide();
            searchEventBrite();
            if(hungry){
                searchYelp();
            }

        })
    }


    function displayFoodOptions(){
        $("#food").append("<h4>Your Restaurant for tonight is</h4>")
        setTimeout(function() {
        $("#food").append("<h4>"+ restaurantName +"</h4>");
        $("#food").append("<img class='dataPic' src=" + restaurantImage_url + ">")
        $("#food").append("<br>")
        $("#food").append("<a class='target='_blank' href=" + restaurant_url + "> Visit Yelp Page </a>" )
        },1500)
    }

    function displayEventOptions(){
        
            $("#event").append("<h4>Your event for Tonight is</h4>")
            setTimeout(function() {
            $("#event").append("<h2>"+ eventName +"</h2>");
            $("#event").append("<img class='dataPic' src=" + eventimageUrl + ">")
            $("#event").append("<br>")
         //   trimmedEventDescription = eventDescription.substring(0,100)
            if(eventDescription.length > 300 ){
                trimmedEventDescription = eventDescription.substring(0,300)
                $("#event").append("<p'>"+ trimmedEventDescription +"...</p>")
            }else{
                $("#event").append("<p'>"+ eventDescription +"</p>")
            }
            $("#event").append("<p'>'Starts at'"+ eventStart +"</p>")
            $("#event").append("<p'>'Ends at'"+ eventEnd +"</p>")
            $("#event").append("<a class='target='_blank' href=" + eventUrl + "> Visit EventBrite</a>" )
            },1500)
    }

    function displayMovieOptions(){
        $("#event").append("<h4>Your movie for Tonight is</h4>")
        setTimeout(function() {
        $("#event").append("<h2>"+ movieName +"</h2>");
        $("#event").append("<img class='dataPic' src=" + posterURL + ">")
        $("#event").append("<br>")
        $("#event").append("<p'>"+ movieDescription +"</p>")
        $("#event").append("<p'>'Rated: '"+ movieRating +"</p>")
        $("#event").append("<a class='target='_blank' href=" + movieTicketURL + "> Get Your Ticket </a>" )
        },1500)

    }




    ///AJAX CALLS, SEARCH YELP, SEARCH MOVIES, SEARCH EVENTBRIGHT
    function searchYelp() {
        let location = localStorage.getItem("location")
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
                let randomRestaurant = Math.floor(Math.random() * response.length);
                restaurantName = response[randomRestaurant].name;
                restaurant_url = response[randomRestaurant].url;
                restaurantImage_url = response[randomRestaurant].image_url;
    
                console.log("RESTAURANT")
                console.log(response)
                console.log(restaurantName);
                console.log(restaurant_url);
                console.log( restaurantImage_url);
                setTimeout(function(){
                displayFoodOptions();
                },3500)
        
            }
         });      
         
    
    }
    
    function searchMovies() {
        const today = new Date().toISOString().slice(0, 10);
        let location = localStorage.getItem("location")
        const queryURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + today + "&zip=" + location + "&api_key=5m65qnrcm3fub6kecc36gqpk";
     
        $.ajax({
            type: 'GET',
            url: queryURL,
            dataType: "json",
    
        }).done(function(data) { 
            const response = data;
            console.log(response)
           
            //picks random Movie from however many new ones it returns [Movie API]
             let randomMovie = Math.floor(Math.random() * response.length)
             
                movieName = response[randomMovie].title;
                movieDescription = response[randomMovie].shortDescription;
                posterURL = "https://cuso.tmsimg.com/" + response[randomMovie].preferredImage.uri 
                // movieRating = response[randomMovie].ratings[0].code
                
                let showtimesArray = response[randomMovie].showtimes;
    
             
                
                console.log(movieName);
                // console.log(movieRating);
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
                   setTimeout(function() {
                   displayMovieOptions()
                   },500)
            });
    
    
        }

        function searchEventBrite() {
            let location = localStorage.getItem("location")
            const queryURL = "https://private-anon-15caf22989-eventbriteapiv3public.apiary-proxy.com/v3/events/search/?token=NYPPF5ZFS2WQZMMQSIJJ&location.address=" + location + "&location.within=20mi&start_date.keyword=today"
         
            $.ajax({
                type: 'GET',
                url: queryURL,
                dataType: "json",
        
            }).done(function(data) { 
               
                console.log("Event Brite");
                console.log(data.events);
                const response = data.events;
                //picks random event from the 50 it returns [EVENT BRITE]
                 let randomEvent = Math.floor(Math.random() * response.length)
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
                    setTimeout(function(){
                    displayEventOptions()
                    },500)
        
            });
        
        
        }
