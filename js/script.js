let timer = {
  d: new Date(),
  hours: document.querySelectorAll(".hours"),
  minutes: document.querySelectorAll('.minutes'),
  day: document.querySelector('.day'),

  getTime() {
    for (let i = 0; i < timer.hours.length; i++) {
      timer.hours[i].innerHTML = timer.d.getHours();
    }
    for (let i = 0; i < timer.minutes.length; i++) {
      timer.minutes[i].innerHTML = timer.d.getMinutes();
      if (timer.minutes[i].innerHTML.length === 1) {
        timer.minutes[i].innerHTML = "0" + timer.minutes[i].innerHTML;
      }
    }

    return timer.hours + timer.minutes;
  },

    getDate() {
       let day;
       switch(timer.d.getDay()) {
         case 0:
           day = "Sunday";
           break;
         case 1:
            day = "Monday";
            break;
         case 2:
            day = "Tuesday";
            break;
         case 3:
            day = "Wednesday";
            break;
        case 4:
           day = "Thursday";
           break;
        case 5:
           day = "Friday";
           break;
        case 6:
           day = "Saturday";
      }
      let month;
      switch(timer.d.getMonth()) {
        case 0:
          month = "January";
          break;
        case 1:
          month = "February";
          break;
        case 2:
          month = "March";
          break;
        case 3:
          month = "April";
          break;
       case 4:
          month= "May";
          break;
       case 5:
          month = "June";
          break;
       case 6:
          month = "July";
          break;
        case 7:
          month = "August";
            break;
        case 8:
          month = "September";
             break;
        case 9:
          month = "October";
             break;
        case 10:
          month = "November";
             break;
        case 11:
          month = "December";
            break;
      }
       timer.day.innerHTML = day + ", " + month + timer.d.getDate();

       return timer.day + timer.date;
    }

}

timer.getTime();
timer.getDate();

const onButton = document.querySelector(".on-button");
const homeButton = document.querySelector(".home-button");
const homePage = document.querySelector(".home-page");
const appPage = document.querySelector(".app-page");
const weatherButton = document.querySelector(".weather-button");
const mainApps = document.querySelector(".app-main");
let backbutton = document.querySelector(".back-button");

onButton.addEventListener('click', function() {

  setTimeout(function() {
    homePage.classList.remove("displayNone");
  }, 500);

  onButton.classList.add("displayNone");
  homeButton.classList.remove("displayNone");
})

homeButton.addEventListener("click", function() {
  setTimeout(function() {
    homePage.classList.add("displayNone");
    appPage.classList.remove("displayNone");
  }, 500);
});

weatherButton.addEventListener('click', function() {
  let weatherApp = document.querySelector(".weather-app");
  setTimeout(function() {
    weatherApp.classList.remove("displayNone");
    mainApps.classList.toggle("displayNone");
  }, 500);
})

backbutton.addEventListener("click", function() {
  weatherApp.classList.add("displayNone");
  mainApps.classList.remove("displayNone");
})

/*************
  Weather APP
************/

let weather = document.querySelector('.weather');
let farenheit = document.querySelector('.farenheit');
let celsius = document.querySelector('.celsius');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }


function showPosition(position) {
  //Holds long and lat in a variable
   let long = position.coords.longitude;
   let lat = position.coords.latitude;
   let city = document.querySelector('.city');
   let temp = document.querySelector('.temp');
   let curWeather = document.querySelector('.currentWeather');
   let weatherIcon = document.querySelector('.weatherIcon');

   //Testing that it works


  let urlRequest = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;

  $.getJSON(urlRequest, function(data) {
    if (data.weather[0].main === "Clouds") {
      weatherIcon.innerHTML = '<i class="fa fa-cloud" aria-hidden="true"></i>'
    }

    city.innerHTML = data.name + ',' + data.sys.country;
    console.log(data.sys.country,"country");
    temp.innerHTML = Math.round(data.main.temp) + '&degC';
    console.log(data.main.temp);
    curWeather.innerHTML = data.weather[0].main;
      console.log(data.weather[0].main);
      farenheit.addEventListener('click', function() {
        let farenheitDeg =Math.round((data.main.temp * 9/5) + 32);
        temp.innerHTML = farenheitDeg + '&degF';
      })
        celsius.addEventListener('click', function() {
         temp.innerHTML = Math.round(data.main.temp) + '&degC';
        })

  })

}
