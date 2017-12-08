 /////---------- BEST COFFEE in Austin
function runQuery() {

  var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&collection_id=22&sort=cost&order=asc&apikey=0818fb9729c7dcbc78591a61346d060d";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // console.log(response);
    // console.log(response.restaurants);

    var bestCoffee = response.data;

    for (var i = 0; i < response.restaurants.length; i++) {
      console.log( response.restaurants[i].restaurant.name);
      console.log( response.restaurants[i].restaurant.location.address);
      var bestCoffeeaddress = response.restaurants[i].restaurant.location.address;
      var bestCoffeename = response.restaurants[i].restaurant.name;

      $("#bestcoffeeResult").append(bestCoffeename);
      $("#locationBestcoffee").append(bestCoffeeaddress);
    }

  });

}
//runQuery();

////------- ALL COFFEE Options function


function coffeeQuery() {

  var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&cuisines=161%2C%2030&establishment_type=286%2C%201&sort=cost&order=asc&apikey=0818fb9729c7dcbc78591a61346d060d";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // console.log(queryURL);
    // console.log(response.restaurants);

    //storing data from the ajax call in the results variable
    var coffeeResults = response.data;
      console.log(response);
    // loop through each result item
    for (var i = 0; i < response.restaurants.length; i++) {
      console.log(response.restaurants[i].restaurant.location.address);
      console.log(response.restaurants[i].restaurant.name);
      //console.log(response.restaurants[i].restaurant.user_rating.aggregate_rating);
      /////////////
      var coffeeName = response.restaurants[i].restaurant.name;
      var coffeeRating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
      var coffeeLocation = response.restaurants[i].restaurant.location.address;
      $("#coffeeResult").append(coffeeName);
      $("#locationCoffee").append(coffeeLocation);
      $("#ratingCoffee").append(coffeeRating);
    }

});

}
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
      ////////////////////////
      var bestBeeradddress = response.restaurants[i].restaurant.location.address;
      var bestBeername = response.restaurants[i].restaurant.name;
      $("#bestbeerResult").append(bestBeername);
      $("#locationBestbeer").append(bestBeeradddress);

    }

  });

}
//runbestbeerQuery();


/////----------- ALL BEER options near function

function beerQuery() {

  var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&cuisines=268&establishment_type=283%2C161%2C%20292%2C%206%2C%207&sort=cost&order=asc&apikey=0818fb9729c7dcbc78591a61346d060d";
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    // console.log(response);
    // console.log(response.restaurants);

    var beerResults = response.data;

    for (var i = 0; i < response.restaurants.length; i++) {
      console.log(response.restaurants[i].restaurant.name);
      console.log(response.restaurants[i].restaurant.location.address);
      //console.log(response.restaurants[i].restaurant.user_rating.aggregate_rating);
      /////////////////////
      var beerName = response.restaurants[i].restaurant.name;
      var beerRating = response.restaurants[i].restaurant.user_rating.aggregate_rating;
      var beerAdress = response.restaurants[i].restaurant.location;
          $("#beerResult").append(beerName);
          $("#beerLocation").append(beerAdress);
          $("#beerRating").append(beerRating);


    }

  });

}
//beerQuery();
