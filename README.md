Let's Go Out

Fall 2019  
Dan McCarthy  
Chris Gilliam  
Erwin Angeles  
Kevin Cowan  
Sharon Story Smith   storysmithsharon@gmail.com  

Uses: Bootstrap, jQuery, APIs.  

Screen Shot:  
    [screenshot 1] (PrintScreen.png)      
    [screenshot 2] (PrintScreen2.png)
     
Working Demo:  
    ** Event function doesn't display results.  
    ** Movie function doesn't display results.  
    ** Hungry "yes" does work.  
    [ Let's Go Out](https://sstorysmith.github.io/LetsGoOut/)  
    

Developer: Download Code and open index.html in a browser.  

Overview:  
    Lets Go Out helps to organize an exciting and spontaneous night out on the town.  
    Experience all that local nightlife has to offer! Whether it's a dinner and a concert, or   catching a movie and some drinks.   

    ** Event function doesn't display results.   
    ** Movie function doesn't display results.  
    ** Hungry "yes" does work.   
        
App Design:  
    Once the DOM is loaded, code begins executing. Location (Zip Code) is set by a call to Google Maps OR an override by the user. Zipcode is used to query the local nightlife and random selections are made based on answered questions. APIs: Eeventbrite, Fandango, Yelp, Google Maps, TMS Movie. A "submit" button will kick off the logic.
    A photo of the venue is displayed:  
        If user doesn't like the recommendation presented, there's a "re-roll" button to click.
        If user does like the recommendation, there's a "yelp" button to display reviews. There's also a map displayed of the venue.  
    Moments.js is used to set and convert time values.

    

  



