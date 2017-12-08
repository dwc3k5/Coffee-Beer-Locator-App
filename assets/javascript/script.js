    // on click funtion for navigation bar to appear on click
    $('#nav-icon3').click(function(){
        $(".list-items").slideToggle(800);
    });


    $(window).load(function() {
      $("#content-index").show();
      $("#search-connect-btn").fadeIn(2000);
    });

    $("#like").click(function () {
      $("#likes").show(200);
    });

    $("#dislike").click(function () {
      $("#dislikes").show(200);
    });




    // overlay navigation menu
    $("#hamburger-nav").click(function() {
      $("#overlay").show();
    });

    $("#exit-btn").click(function() {
      $("#overlay").hide();
    });
//-----------------------------------------------------------------------------
// WORKING SCRIPT--------------------------------------------------------------

/*Initialize Firebase----------------------------------------------------------*/
  var config = {
    apiKey: "AIzaSyDRQXaMgkueFCWKSOynK2w_2e81_J7xUUM",
    authDomain: "gp1-app.firebaseapp.com",
    databaseURL: "https://gp1-app.firebaseio.com",
    projectId: "gp1-app",
    storageBucket: "gp1-app.appspot.com",
    messagingSenderId: "922497710932"
  };
  firebase.initializeApp(config);
	//variables
	var database = firebase.database();


/*Users Search Parameters------------------------------------------------------*/
var search;
var zipcode;
var mAway = 1609;
var destinationSelect = 'bar';
var drawDistance = 14;

/*search Results information Storage-------------------------------------------*/
//variables print information in the modal
      var map;
      var infowindow;
      var locationId= [];
      var locationName= [];
      var locationRating=[];
      var locationVicinity=[];
      var location;
      var position = {lat: 30.286, lng: -97.731};
      // var location = "";

/*function triggers when search button is pressed------------------------------*/
$(document).ready(function(){
  $("#search-btn").on("click", function(event){
    event.preventDefault();
    $("#searchButtons").html('<h1 id="searchResultsTitle"> Search Results: </h1>');
    //sets distance converting miles to meters
    miAway = parseInt($("#miles-away>option:selected").text());
    mAway = miAway*1609;
    //sets zome distance based on miles choice
    if(miAway === 1){
      drawDistance = 14;
    }else if(miAway === 5){
      drawDistance = 12;
    }else if(miAway === 10){
      drawDistance = 11;
    }else if(miAway === 15){
      drawDistance = 10;
    }else if(miAway === 20){
      drawDistance = 10;
    }else if(miAway === 25){
      drawDistance = 10;
    }else if(miAway === 30){
      drawDistance = 10;
    }
    //sets categories to coffee shops
    if($("#destination-select>option:selected").text()==="Coffee"){
      destinationSelect = "cafe";
    //sets categories to bars
    }else if($("#destination-select>option:selected").text()==="Brews"){
      destinationSelect = "bar";
    //NYI looks for both at the same time
    }

    //NYI takes in user search parameters for zipcode or specific location name
    search = document.getElementById("pac-input").value;
    zipcode = $("#zipcode").val();
    console.log("searchVal "+search);
    if(search !== ""){
      return initMapName();
    }
    //runs initMap() function with new user specficiations
    initMap();
  });
});


      /*map generation---------------------------------------------------------------*/
      initMap();
      /*makes the location equal to the users current location-----------------------*/
        //adds functionality to map which finds the users location
        // infoWindow = new google.maps.InfoWindow(document.getElementById("map"));
        // //creates the marker locator on the google map. Probably not necessary
        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition(function(position) {
        //     console.log("looking");
        //     position = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };
        //
        //     infoWindow.setPosition(position);
        //     infoWindow.setContent('Location found.');
        //     infoWindow.open(map);
        //     map.setCenter(position);
        //   }, function() {
        //     handleLocationError(true, infoWindow, map.getCenter());
        //   });
        // } else {
        //   // Browser doesn't support Geolocation
        //   handleLocationError(false, infoWindow, map.getCenter());
        // }

/*map creation by TYPE---------------------------------------------------------*/
      function initMap() {

        infoWindow = new google.maps.InfoWindow(document.getElementById("map"));
        //creates the marker locator on the google map. Probably not necessary
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log("looking");
            position = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(position);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(position);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

        //make a new map
        map = new google.maps.Map(document.getElementById('map'), {
          //center map on austin lat/lng
          center: position,
          //sets zoom
          zoom: drawDistance
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: position,
          rankBy: google.maps.places.RankBy.DISTANCE,
          // radius: mAway,
          type: [destinationSelect],
          // name: location,
        }, callback);
      }
/*map creation by NAME---------------------------------------------------------*/
      function initMapName() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: position,
          zoom: drawDistance
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: position,
          rankBy: google.maps.places.RankBy.DISTANCE,
          // radius: mAway,
          name: search,
        }, callback);
      }


/*variables used for markers---------------------------------------------------*/
var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';



/*marker generation------------------------------------------------------------*/
      function createMarker(place) {
        console.log(place.rating);
        var rate;
        if(place.rating === undefined){
         rate = "NR";
        }else{
          rate = place.rating;
        }
        var placeLoc = place.geometry.location;
        var beer = 'https://chart.googleapis.com/chart?chst=d_simple_text_icon_below&chld='+rate+'|14|32302e|beer|24|FFCC33|32302e';
        var coffee = 'https://chart.googleapis.com/chart?chst=d_simple_text_icon_below&chld='+rate+'|14|32302e|cafe|24|ebe4c2|32302e';
        var basicIconc = 'https://chart.googleapis.com/chart?chst=d_simple_text_icon_below&chld='+rate+'|14|32302e|cafe|24|ebe4c2|32302e';

        if(destinationSelect==="cafe"){
          basicIconc = coffee;
        }else{
          basicIconc = beer;
        }

        var marker = new google.maps.Marker({
          map: map,
          placeId: place.place_id,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP,
          // label: String(place.rating),
          // icon:iconBase+'coffee_maps.png'
          icon:basicIconc

        });

/*marker click function--------------------------------------------------------*/
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name + "<br>" + "Rating: " + place.rating + "/5" + "<br>" + "Open now: " + place.opening_hours.open_now);
          infowindow.open(map, this);
          var austin = position;
      //     var panorama = new google.maps.StreetViewPanorama(
      //
      //       document.getElementById('pic'), {
      //         position: austin,
      //         pov: {
      //           heading: 34,
      //           pitch: 10
      //         }
      //       });
      //   map.setStreetView(panorama);
      //   });
    });}



/*search results button generation---------------------------------------------*/
var result;
function btnGen(result){
  $("#searchButtons").append("<button id="+result.id+" class='searchBtn'>"+result.name+"</button>");
  $("#"+result.id).hide().fadeIn(100);
}
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++){
            result = results[i];
            setTimeout(()=>{createMarker(results[i])},i*100);
            // createMarker(results[i]);
              setTimeout(()=>{btnGen(results[i])}, i*250);
            // $("#searchButtons").append("<button id="+results[i].id+" class='searchBtn'>"+results[i].name+"</button>");
            locationId.push(results[i].id);
            locationName.push(results[i].name);
            locationRating.push(results[i].rating);
            locationVicinity.push(results[i].vicinity);
            // console.log(locationName);
          }}}

          // arr[10]



/*Modal variables--------------------------------------------------------------*/
var id;
//gets set to id from locationId[]

/*modal generation-------------------------------------------------------------*/
//function triggers on any search result button press
$(document).on("click", ".searchBtn", function(){
    id = $(this).attr("id");
    //sets variable = respective locationId array #
    var arrayNum = locationId.indexOf(id);
    $("#mLocName").text(locationName[arrayNum]);
    $("#mLocRating").text("Rating: " + locationRating[arrayNum]);

    $("#mLocVicinity").text(locationVicinity[arrayNum]);

//firebase checks if child for location already exists
    database.ref("/locations").on("value", function(snapshot){
      if(snapshot.child(id).exists()){

      //if it doesn't add a new child with likes/dislikes
      }else{
        database.ref("/locations").update({
          //ignore syntax error on line below. working as intended
          [id]:{
            liked:0,
            disliked:0
          }
        });
      }
      //set likes and dislikes equal to respective firebase
      var popular = snapshot.child(id).child("liked").val();
      var unpopular = snapshot.child(id).child("disliked").val();
      $("#userRates").text("Likes: "+popular+" | Dislikes: "+ unpopular);
      $("#ourRate").html('<button id="mLike">LIKE <i class="fa fa-thumbs-o-up" aria-hidden="true"></i></button><button id="mDislike">DISLIKE <i class="fa fa-thumbs-o-down" aria-hidden="true"></i> </button>');
    });
    modal.style.display = "block";
    });



/*generates modal information--------------------------------------------------*/
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// SCRIPT FOR WEBSITE CSS ANIMATION -------------------------------------------*/
// Document Ready
$(document).ready(function() {

    // on click funtion for navigation bar to appear on click
    $('#nav-icon3').click(function(){
        $(".list-items").slideToggle(800);
    });


    $(window).load(function() {
        $("#content-index").show();
        $("#search-connect-btn").fadeIn(2500);
    });


});


/*modal "like" click functionality---------------------------------------------*/
    $(document).on("click", "#mLike", function() {
      console.log("clicked");
      var good= firebase.database().ref("locations/"+id);
      var likes;
        good.once("value", function(snapshot){
          likes = snapshot.val().liked;
          likes++;
          var thePath = "locations/"+id+"/liked";
          database.ref().update({[thePath]:likes});
          $("#mLike").fadeOut();
          $("#mDislike").fadeOut();
        });

      database.ref("locations/"+id+"/liked").once("value",function(snapshot){

        console.log("you liked");
        console.log(snapshot.val());
        $("#mLikes").text("Likes: "+ (parseInt(snapshot.val())+1));
      });
    });



/*modal functionality for dislikes---------------------------------------------*/
    $(document).on("click", "#mDislike", function () {

      console.log($(this));
      var bad= firebase.database().ref("locations/"+id);
      var dislikes;
        bad.once("value", function(snapshot){
          dislikes = snapshot.val().disliked;
          dislikes++;
          var thePath = "locations/"+id+"/disliked";
          database.ref().update({[thePath]:dislikes});
          $("#mDislike").fadeOut();
          $("#mLike").fadeOut();
        });
        database.ref("locations/"+id+"/disliked").once("value",function(snapshot){
          console.log("you disliked");
          console.log(snapshot.val());
          $("#mDislikes").text("Dislikes: "+ (parseInt(snapshot.val())+1));
        });
    });



/* overlay navigation menu-----------------------------------------------------*/
    $("#hamburger-nav").click(function() {
      $(".overlay-content").style.width = "100%";
    });

    $("#exit-btn").click(function() {
      $(".overlay-content").style.width = "0%";
    });

/*Zomato functionality---------------------------------------------------------*/
var zNames = [];
var zAddress = [];
$("#zRec").on("click",function(event){
  event.preventDefault();
  if($("#destination-select>option:selected").text()==="Coffee"){
    destinationSelect = "cafe";
  //sets categories to bars
  }else if($("#destination-select>option:selected").text()==="Brews"){
    destinationSelect = "bar";
  //NYI looks for both at the same time
  }
  if(destinationSelect==="cafe"){
    $("#searchButtons").html('<h1 id="searchResultsTitle"> Zomato Coffee Picks: </h1>');
    runQuery();
  }else if(destinationSelect==="bar"){
    $("#searchButtons").html('<h1 id="searchResultsTitle"> Zomato Bar Picks: </h1>');
    runbestbeerQuery();
  }
});

/////---------- BEST COFFEE in Austin
function runQuery() {

 var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&collection_id=22&sort=cost&order=asc&apikey=0818fb9729c7dcbc78591a61346d060d";
 console.log(queryURL);
 $.ajax({
   url: queryURL,
   method: "GET"
 }).done(function(response) {
   var bestCoffee = response.data;

   for (var i = 0; i < response.restaurants.length; i++) {
    //  console.log( response.restaurants[i].restaurant.name);
    //  console.log( response.restaurants[i].restaurant.location.address);
     var bestCoffeeaddress = response.restaurants[i].restaurant.location.address;
     var bestCoffeename = response.restaurants[i].restaurant.name;
     zNames.push(bestCoffeename);
     zAddress.push(bestCoffeeaddress);
     $("#searchButtons").append("<button class='zBtns' id='"+bestCoffeename+"' >"+bestCoffeename+"</button>").hide().fadeIn(100);
   }
   console.log(zNames);
   console.log(zAddress);
 });

}

//clicking a button generated by zomato puts the location name in the location search
$(document).on("click", ".zBtns",function(){
  console.log("zbutons working");
$("#pac-input").attr("value", $(this).attr("id"));
});






var input = document.getElementById('pac-input');
////--------- BEST BEER in Austin
function runbestbeerQuery() {
  var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&collection_id=41&sort=cost&order=asc&apikey=0818fb9729c7dcbc78591a61346d060d";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // console.log(response);
    // console.log(response.restaurants);

    var bestBeer = response.data;

    for (var i = 0; i < response.restaurants.length; i++) {
      console.log(response.restaurants[i].restaurant.name);
      console.log(response.restaurants[i].restaurant.location.address);
      var bestBeeradddress = response.restaurants[i].restaurant.location.address;
      var bestBeername = response.restaurants[i].restaurant.name;
      $("#bestbeerResult").append(bestBeername);
      $("#locationBestbeer").append(bestBeeradddress);

      zNames.push(bestBeername);
      zAddress.push(bestBeeradddress);
      $("#searchButtons").append("<button class='zBtns' id='"+bestBeername+"' >"+bestBeername+"</button>");

    }

  });
}
