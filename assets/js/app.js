//global variables 
let hungry; 
// let thirsty;
let movie;

let restaurantName;
let restaurant_address = [];
let restaurant_hours = {
    0: {Open: "", Close: ""},
    1: {Open: "", Close: ""},
    2: {Open: "", Close: ""},
    3: {Open: "", Close: ""},
    4: {Open: "", Close: ""},
    5: {Open: "", Close: ""},
    6: {Open: "", Close: ""}
};
let restaurantImage_url;
let restaurant_url;
let restaurant_categories = [];
let restaurant_id;

let eventName;
let eventid;
let eventAddress = "";
let eventDescription;
let eventStart;
let eventEnd;
let eventUrl;
let eventimageUrl;

let movieName;
let movieDescription;
let movieRating;
let posterURL;
let movieTicketURL;
// let eventcount = 0
let foodcount = 0

$(document).ready(function(){
    // event brite API Key: NYPPF5ZFS2WQZMMQSIJJ
    // Fandango API Key: 7sys79jddrrq8m26yucpf7zb  Secret: hGK9N44PtU
    // Yelp API API Key: v03Ra_pyFmjsGUIHM7Io4Mzr7YsVegkePN7fYapQQcV53mJSEubRnBy9QwI2cTajhrX6y9KTslu8wKUEAuObukAOCmrXVD04EDsS6Cx3kBhfcrHMOFulo5L2hQl4XXYx
    // yelp Client ID: zVbgUN-sk5xSJD8EtB2CCQ
    // google Maps API Key: AIzaSyAS_aRmkWhE3-tHwQMKta0odrvWrEXv4Kw
    // TMS Movie API api Key: a5ht9r228dugghx2hf2cn7qa 
    localStorage.clear('location');
    geoFindMe();
    
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
            // hungryQuestion();
            eventType();
        }
        // searchEventBrite();
        // searchYelp();
        // searchMovies();
    })
 
});

function geoFindMe() {
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      let queryURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBWQ-sFtacE3m0IMYrFlP7w_dgNQpL-bBw`

     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
     $.ajax({
        type: 'GET',
       url: queryURL,
       dataType: "json",
        success: function(data){
          const response = data.results[0].formatted_address;
          let address = response
          let locationArr = address.split(',');
          console.log(address);
          let zipcode = locationArr[2].slice(-5);
          $('#location').val(zipcode);
        }
    });
    
    }
  
    function error() {
     console.log('Unable to retrieve your location');
    }
  
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  
  }


let hungryQuestion = function () {
    let yesBtn = `<button class="btn btn-lg col-md-12 btn-secondary" id="yes1"><i class="fas fa-check-circle"></i> YES</button>`;
    let noBtn = `<button class="btn btn-lg col-md-12 btn-secondary" id="no1"><i class="fas fa-times-circle"></i> NO</button>`;
    $("#homepage").hide();
    $("#questions-box").append("<h2>Are You Hungry?</h2>");
    $("#questions-box").append("<br>");
    $("#questions-box").append(yesBtn, noBtn);
    $('#yes1').on("click", function(){
        hungry = true;
        console.log(hungry);

        $("#questions-box").hide();
        let loadingText = `<h4>Deciding for you...</h4>`
        $("#loading").append(`<img src="assets/images/loading.svg" width="200" />`, loadingText)
        setTimeout(function() {
            if(movie){
                $("#event").hide();
                searchMovies();
            }else{
                $("#event").hide();
                searchEventBrite();
            }
            if(hungry){
                $("#food").hide();
                searchYelp();
            }
        },4000)
     
    })
    $('#no1').on("click", function(){
        hungry = false;
        console.log(hungry);
        let loadingText = `<h4>Deciding for you...</h4>`
        $("#loading").append(`<img src="assets/images/loading.svg" width="200" />`, loadingText)
        $("#questions-box").hide();
        setTimeout(function() {
            if(movie){
                searchMovies();
            }else{
                searchEventBrite();
            }
            if(hungry){
                searchYelp();
            }
        },4000)
        
    })
}

    let eventType = function () {
        let movieBtn = `<button class="btn btn-lg col-md-12 btn-secondary" id="movie"><i class="fas fa-film"></i> Movie</button>`;
        let showBtn = `<button class="btn btn-lg col-md-12 btn-secondary" id="show"><i class="fas fa-theater-masks"></i> Event</button>`;
        $("#questions-box").empty();
        $("#questions-box").append("<h2>Would you prefer a Movie or an Event?</h2>");
        $("#questions-box").append("<br>");
        $("#questions-box").append(movieBtn, showBtn);
        $('#movie').on("click", function(){
            movie = true;
            console.log(movie)
            $("#questions-box").empty();
            hungryQuestion()
            // displayFood();
            
    
        })
        $('#show').on("click", function(){
            movie = false;
            console.log(movie);
            // displayFood ();
            $("#questions-box").empty();
            hungryQuestion()

        })
    }


    function displayFoodOptions(){
        let newFoodBtn = `<button class="btn btn-md btn-primary food-button" id="foodbtn">Re-Roll<i class="fas fa-dice"></i></button>`;
        $("#food").empty();
        $("#food_details").empty();
        $("#food").append(`<h4 class="results">Restaurant for tonight:</h4>
        <h4>${restaurantName}</h4>
        <img class="dataPic" src="${restaurantImage_url}">
        <p><em>${restaurant_categories.join(", ")}</em></p>`)
        let restaurant_addie_split = restaurant_address.join(" ").replace(" ", "+");
        $('#food_details').append(`
        <h4 class="results">Restaurant Address:</h4>
        <h5>${restaurant_address.join(", ")}</h5>
        <iframe
        width="100%" height="250" frameborder="0" style="border:0"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAS_aRmkWhE3-tHwQMKta0odrvWrEXv4Kw
        &q=${restaurant_addie_split}" allowfullscreen>
        </iframe>
        <a target="_blank" href="${restaurant_url}"><button class="btn btn-danger">Visit Yelp <i class="fab fa-yelp"></i></button></a>`,newFoodBtn)
         window.scrollTo(0,document.body.scrollHeight);
         $("#loading").empty();
         $("#food").show();
         $("#food_details").show();
    }

    function displayEventOptions(){
        $("#results-box").addClass("dotted-line")
            $("#event").empty()
            $("#event_address").empty();
            $("#loading").empty();
            $("#event").append("<h4 class = results>Your event for tonight:</h4>")
            if(new String(eventName).length>75){
                trimmedEventName = eventName.substring(0,75)
                $("#event").append("<h4>"+ trimmedEventName +"...</h4>");
            }else{
                $("#event").append("<h4>"+ eventName +"</h4>");
            }
            $("#event").append("<img class='dataPic' src=" + eventimageUrl + ">")
            $("#event").append("<br>")
         //   trimmedEventDescription = eventDescription.substring(0,100)
            if(new String(eventDescription).length > 300 ){
                trimmedEventDescription = eventDescription.substring(0,300)
                $("#event").append("<p'>"+ trimmedEventDescription +"...</p>")
            }else{
                $("#event").append("<p'>"+ eventDescription +"</p>")
            }
            $('#event_address').append(`<h4 class="results">Venue Details:</h4>
            <h5>${eventAddress}</h5>`);
            let newEventBtn = `<button class="btn btn-md btn-primary event-button" id="eventbtn">Re-roll<i class="fas fa-dice"></i></button>`;
            // $("#event").append(newEventBtn);
            $("#eventbtn").on("click",function() {
                $("#event").empty();
                if (movie) {
                searchMovies()
                $("eventbtn").remove()
                }
                else {
                searchEventBrite();
                $("eventbtn").remove()
                }
            })
            let address_split = eventAddress.replace(" ", "+");
            $("#event_address").append(`<iframe
            width="100%" height="250" frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAS_aRmkWhE3-tHwQMKta0odrvWrEXv4Kw
            &q=${address_split}" allowfullscreen>
          </iframe>`)
            $("#event_address").append(`
            <h5>When: ${moment(eventStart).format('h:mm A')}-${moment(eventEnd).format('h:mm A')}</h5>`,
            `<a target="_blank" href="${eventUrl}">
            <button class="btn btn-info">View Details <i class="fas fa-info-circle"></i></button></a>`, newEventBtn, `<hr>`)
            $('#event').show();
            $("#event_address").show();
            
    }

    function displayMovieOptions(){
        $("#results-box").addClass("dotted-line")
        $("#loading").empty();
        $("#event").empty();
        $("#event").append("<h4 class = results>Your movie for tonight:</h4>")
        $("#event").append("<h2>"+ movieName +"</h2>");
        $("#event").append("<img class='dataPic' src=" + posterURL + ">")
        $("#event").append("<br>")
        $("#event").append("<p'>"+ movieDescription +"</p>")
        // $("#event").append("<p'>'Rated: '"+ movieRating +"</p>")
        let newEventBtn = `<button class="btn btn-md btn-primary event-button" id="eventbtn">Re-Roll <i class="fas fa-dice"></i></button>`;
            // $("#event").append(newEventBtn);
        if(movieTicketURL == undefined){
            $("#event").append(newEventBtn)
        }else{
            $("#event").append(`<a target="_blank" href="${movieTicketURL}"><button class="btn btn-success">Get Tickets <i class="fa fa-ticket"></i></button> </a>`, newEventBtn )
        }
        $('#event').show();
    }

    $("#title").on("click", function() {
      location.reload();
    })

    $(document).on("click", '.event-button', function() {
        $("#event").empty();
        $("#event_address").empty();
        $("#event").append("<h4>Re-rolling event options...</h4>")
        if (movie) {
        searchMovies()
        // $("#eventbtn").remove()
        }
        else {
        searchEventBrite();
        // $("#eventbtn").remove()
        }
    })

    $(document).on("click", '.food-button', function() {
        $("#food").empty();
        $("#food_details").empty();
        $("#food").append("<h4>Re-rolling food option...</h4>")
         restaurant_categories = [];
         restaurant_address = []
        searchYelp();
        // $("#foodbtn").remove()
    })

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
                restaurant_id = response[randomRestaurant].id;
                restaurant_url = response[randomRestaurant].url;
                restaurantImage_url = response[randomRestaurant].image_url;

                for(let i = 0; i < response[randomRestaurant].categories.length; i++)
                {
                    let catg = response[randomRestaurant].categories[i].title
                    if(catg == undefined){
                    }else{
                        restaurant_categories.push(catg);
                    }
                }
                
                for(let i = 0; i < response[randomRestaurant].location.display_address.length; i++)
                {
                    let addie = response[randomRestaurant].location.display_address[i]
                    if(addie == undefined){
                    }else{
                        restaurant_address.push(addie);
                    }
                }
                console.log("RESTAURANT")
                console.log(response[randomRestaurant]);
                console.log(restaurant_address);
                console.log(restaurant_categories);
                console.log(response)
                console.log(restaurantName);
                console.log(restaurant_url);
                console.log( restaurantImage_url);
                displayFoodOptions();    
            },error: function (request, status, error) {
                $("#loading").empty()
               $("#food").append(request.responseText)
            }
         });      
        //  function getFoodDetails(){
        //     let queryURL = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${restaurant_id}`;

        //     $.ajax({
        //        url: queryURL,
        //        headers: {
        //         'Authorization':'Bearer v03Ra_pyFmjsGUIHM7Io4Mzr7YsVegkePN7fYapQQcV53mJSEubRnBy9QwI2cTajhrX6y9KTslu8wKUEAuObukAOCmrXVD04EDsS6Cx3kBhfcrHMOFulo5L2hQl4XXYx',
        //     }, method: 'GET',
        //         dataType: 'json',
        //         success: function(data){
        //             let response = data.hours[0].open;
        //           for(let i =0;i < 7; i++){
        //               restaurant_hours[i].Open = response[i].start;
        //               restaurant_hours[i].Close = response[i].end;
        //           }
        //           console.log(response);
        //             console.log(restaurant_hours);
        //             displayFoodOptions();    
        //         }
        //     });
        // }
        
    
    }
    
    
    function searchMovies() {
        const today = new Date().toISOString().slice(0, 10);
        let location = localStorage.getItem("location")
        const queryURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + today + "&zip=" + location + "&api_key=5m65qnrcm3fub6kecc36gqpk";
     
        $.ajax({
            type: 'GET',
           url: queryURL,
           dataType: "json",
            success: function(data){
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
                  displayMovieOptions();

               //    if (eventcount < 1 ) {
               //    setTimeout(function() {
               //     eventRetry()
               //    },500)
               // }
               //    eventcount++

           },error: function (request, status, error) {
               $("#loading").empty()
              $("#event").append(request.responseText)}
        });      
    
    
        }


        function searchEventBrite() {
            let location = localStorage.getItem("location")
            const queryURL = "https://private-anon-15caf22989-eventbriteapiv3public.apiary-proxy.com/v3/events/search/?token=NYPPF5ZFS2WQZMMQSIJJ&location.address=" + location + "&location.within=20mi&start_date.keyword=today"
         
            $.ajax({
                type: 'GET',
               url: queryURL,
               dataType: "json",
                success: function(data){
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
                        eventid = response[randomEvent].venue_id;
                        if(response[randomEvent].logo == null){
                          eventimageUrl = "https://via.placeholder.com/400x200?text=Image+Not+Available"
                        }else{
                            eventimageUrl = response[randomEvent].logo.original.url
                        }
                      
            
                        console.log(eventName);
                        console.log(eventDescription);
                        console.log(eventStart);
                        console.log(eventEnd);
                        console.log(eventUrl)
                        console.log(eventimageUrl)
                        
                        getVenueAddress()
                       
                        // if (eventcount < 1 ) {
                        //     setTimeout(function() {
                        //      eventRetry()
                        //     },4000)
                        //  }
                        // eventcount++
               },error: function (request, status, error) {
                   $("#loading").empty()
                  $("#event").append(request.responseText)}
            });     
        
        
            function getVenueAddress(){
                let queryURL = `https://private-anon-15caf22989-eventbriteapiv3public.apiary-proxy.com/v3/venues/${eventid}/?token=NYPPF5ZFS2WQZMMQSIJJ`
                $.ajax({
                    type: 'GET',
                   url: queryURL,
                   dataType: "json",
                    success: function(data){
                        eventAddress = data.address.localized_address_display
                        displayEventOptions();
                    }
                });
            }
        }
