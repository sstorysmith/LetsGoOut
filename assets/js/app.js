$(document).ready(function(){
    let hungry; 
    let thirsty;
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
            thirstyQuestion();
        })
        $('#no1').on("click", function(){
            hungry = false;
            console.log(hungry);
            thirstyQuestion();
        })
    }

    let thirstyQuestion = function () {
        let yesBtn = "<button id='yes2'>YES</button>";
        let noBtn = "<button id='no2'>NO</button>";
        $("#description").empty();
        $("#main").empty();
        $("#main").text("Are You Thirsty?");
        $("#main").append("<br>");
        $("#main").append(yesBtn, noBtn);
        $('#yes2').on("click", function(){
            thirsty = true;
            console.log(thirsty)
            eventType ();
        })
        $('#no2').on("click", function(){
            thirsty = false;
            console.log(thirsty);
            eventType ();
        })
    }

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
        })
        $('#show').on("click", function(){
            movie = false;
            console.log(movie);
        })
    }

    $("#submit").on("click", function(e){
        e.preventDefault();
        hungryQuestion ();
    })


});