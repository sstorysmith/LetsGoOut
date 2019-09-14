$(document).ready(function(){
    let hungry; 
    // let thirsty;
    let movie;

    let hungryQuestion = function () {
        let yesBtn = "<button id='yes1'>YES</button>";
        let noBtn = "<button id='no1'>NO</button>";
        $("#description").empty();
        $("#main").empty();
        $("#main").text("Are You Hungry?");
        $("#main").append("<br>");
        $("#main").append(yesBtn, noBtn);
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

    // let thirstyQuestion = function () {
    //     let yesBtn = "<button id='yes2'>YES</button>";
    //     let noBtn = "<button id='no2'>NO</button>";
    //     $("#description").empty();
    //     $("#main").empty();
    //     $("#main").text("Are You Thirsty?");
    //     $("#main").append("<br>");
    //     $("#main").append(yesBtn, noBtn);
    //     $('#yes2').on("click", function(){
    //         thirsty = true;
    //         console.log(thirsty)
    //         eventType ();
    //     })
    //     $('#no2').on("click", function(){
    //         thirsty = false;
    //         console.log(thirsty);
    //         eventType ();
    //     })
    // }

    let eventType = function () {
        let movieBtn = "<button id='movie'>Movie</button>";
        let showBtn = "<button id='show'>Show</button>";
        $("#description").empty();
        $("#main").empty();
        $("#main").text("Movie or a Show?");
        $("#main").append("<br>");
        $("#main").append(movieBtn, showBtn);
        $('#movie').on("click", function(){
            movie = true;
            console.log(movie)
            displayFood();
            displayEvent();

        })
        $('#show').on("click", function(){
            movie = false;
            console.log(movie);
            displayFood ();
            displayEvent();
        })
    }

    $("#submit").on("click", function(e){
        e.preventDefault();
        hungryQuestion ();
    })

    let displayFood = function () {
        if (hungry === true) {
            $("#main").empty();
            $("#main").text("Your Restaurant for tonight is ")
            $("body").append("<h2 class='offset-lg-4'>"+ restaurantName +"</h2>");
            $("body").append("<img class='dataPic offset-lg-4' src=" + restaurantImage_url + ">")
            $("body").append("<br>")
            $("body").append("<a class='offset-lg-5' target='_blank' href=" + restaurant_url + "> Visit Yelp Page </a>" )
        }
        else if (hungry === false) {
            console.log("not hungry")
        }
    }

    let displayEvent = function () {
        if (movie === false) {
        $("body").append("<h2  class='offset-lg-4'>'Your event for Tonight is")
        $("body").append("<h2 class='offset-lg-4'>"+ eventName +"</h2>");
        $("body").append("<img class='dataPic offset-lg-4' src=" + eventimageUrl + ">")
        $("body").append("<br>")
        $("body").append("<p class='offset-lg-4'>"+ eventDescription +"</p>")
        $("body").append("<p class='offset-lg-4'>'Starts at'"+ eventStart +"</p>")
        $("body").append("<p class='offset-lg-4'>'Ends at'"+ eventEnd +"</p>")
        $("body").append("<a class='offset-lg-5' target='_blank' href=" + eventUrl + "> Visit Yelp Page </a>" )
        }
        else {
        $("body").append("<h2>'Your movie for Tonight is")
        $("body").append("<h2 class='offset-lg-4'>"+ movieName +"</h2>");
        $("body").append("<img class='dataPic offset-lg-4' src=" + posterURL + ">")
        $("body").append("<br>")
        $("body").append("<p class='offset-lg-4'>"+ movieDescription +"</p>")
        $("body").append("<p class='offset-lg-4'>'Rated: '"+ movieRating +"</p>")
        $("body").append("<a class='offset-lg-5' target='_blank' href=" + movieTicketURL + "> Visit Yelp Page </a>" )
        
    }
    }

});