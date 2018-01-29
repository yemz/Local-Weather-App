//working on Firefox browser
$(document).ready(function(){
  
  var lon;
  var lat;
  var faTemp;
  var ceTemp;
  var changeTemp = true;
  var icon;
 
  //find location through open weather api
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    
    lon = position.coords.longitude;
    lat = position.coords.latitude;
    
   $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
//api url to determine user latitude and longitude
     var apiurl = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=202feb5231b67b3b7b06b92623b6ead6';

  //JSON call to openweatherAPI
  $.getJSON(apiurl, function(data){
  //alert(data.coord.lat);

  //initialize variables to get information from geolocation
  var weather = data.weather[0].description;
  var weatherType = data.weather[0].id;
  var kelvin = data.main.temp;
  var wind = data.wind.speed;
  var city= data.name;
  var country= data.sys.country;
  var humidity= data.main.humidity;
  
   //Convert from Kelvin temperature to farenheit and round number
   faTemp = Math.round(kelvin*(9/5)-459.67);
  
   //Convert from Kelvin temperature to celsius and round number
   ceTemp = Math.round(kelvin-273);
  
  console.log(city);
  $("#city").html(city + ", " + country);
  $("#weather").html(weather);
  $("#weather").css('textTransform', 'capitalize');
  $("#faTemp").html(faTemp + " &#8457;");

  //function to change temperature from F to C when user click temperature
  $("#faTemp").click(function(){
 
    if(changeTemp === false){
       $("#faTemp").html(faTemp + " &#8457;");
       changeTemp = true;
     } else {
       $("#faTemp").html(ceTemp + " &#8451;");
       changeTemp = false;

     }

  });

  //Convert wind speed from meters to miles per hour
  wind = Math.round(2.237*(wind));
  $("#wind").html("Wind Speed: " + wind + " mph");

  //change background according to weather type id website reference: https://www.openweathermap.org/weather-conditions
  
 //if thunderstorm
 if(weatherType >= 200 && weatherType <= 232){
    $('body').css('background-image', 'url(https://images.unsplash.com/photo-1506432734318-4bf212257692?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=8f27ce993ae63f12c64ee078a0ea52ed');
    document.getElementById("icon").src = "http://openweathermap.org/img/w/11d.png";
    $("li").css("color","white");
    $("h1").css("color","white");
    $("h4").css("color","white");
  } else if(weatherType >= 500 && weatherType <= 530){ //if it is raining
    $('body').css('background-image', 'url(https://images.unsplash.com/photo-1477847616630-cf9cf8815fda?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=38ad32eee358b514d67b02b12632fb14');
    //display raining icon
    document.getElementById("icon").src = "http://openweathermap.org/img/w/10d.png";   
    $("li").css("color","white");
    $("h1").css("color","white");
    $("h4").css("color","white");
  } else if(weatherType >= 600 && weatherType <= 622){ //if it is snowing
    $('body').css('background-image', 'url(https://images.unsplash.com/photo-1477601263568-180e2c6d046e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=b9dc61d03a1e3d45eb4bb09ec4e32d4e');
    //display snowing icon
    document.getElementById("icon").src = "http://openweathermap.org/img/w/13d.png";   
  } else if(weatherType >= 801 && weatherType <= 804){ //if it is clear sky
    $('body').css('background-image', 'url(https://images.unsplash.com/photo-1421091242698-34f6ad7fc088?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=2dcc26a60368eb9bd56159824fe24696');
   //display clear sky icon
    document.getElementById("icon").src = "http://openweathermap.org/img/w/01d.png";   
    $("li").css("color","white");
    $("h1").css("color","white");
    $("h4").css("color","white");
  } else {
   $('body').css('background-image', 'url(https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=ef8501bb329f02e545d8822c44968a98');
   //display weather icon 
   document.getElementById("icon").src = "http://openweathermap.org/img/w/02d.png"; 
  }

  $("#humidity").html("Humidity: " + humidity + " %");
  });
});

}

});