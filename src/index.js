/*global axios */

let time = new Date();

function currentTime() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[time.getDay()];
  let hour = time.getHours();
  let minutes = time.getMinutes();
  let today = `${day} ${hour}:${minutes}`;
  return today;
}

let currentDate = document.querySelector("#time");
currentDate.innerHTML = currentTime();

let now = new Date();

function currentTimeNow() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let today = `${day} ${hour}:${minutes}`;
  return today;
}

let currentDateNow = document.querySelector("#now");
currentDateNow.innerHTML = currentTimeNow();
//Challenge 2
function cityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#searchCity"); // Define searchCity here
  let h1 = document.querySelector("#city");
  h1.innerHTML = searchCity.value;
}

let form = document.querySelector("#searching-form");
form.addEventListener("submit", cityName);

//Challenge 3
function fConvert() {
  let fahrenheit = document.querySelector("#temp");
  fahrenheit.innerHTML = `89`;
}

function cConvert() {
  let celcius = document.querySelector("#temp");
  celcius.innerHTML = `32`;
}

let fConversion = document.querySelector("#f");
fConversion.addEventListener("click", fConvert);

let cConversion = document.querySelector("#c");
cConversion.addEventListener("click", cConvert);

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "765043773672fdd9cdd0cd97e3583444";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

let searchForm = document.querySelector("#searching-form");
searchForm.addEventListener("submit", citySearch);

function showWeather(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  let description = document.querySelector("#now");
  let precipitationElement = document.querySelector("#precipitation");
  let precipitation = Math.round(response.data.clouds.all);
  let windElement = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);


  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = response.data.weather[0].description;

  precipitationElement.innerHTML = `Precipitation: ${precipitation}%`;
  windElement.innerHTML = `Wind Speed: ${windSpeed}km/h`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
 
}


function showPosition(position) {
  let apiKey = "765043773672fdd9cdd0cd97e3583444";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".btn.btn-outline-primary");
locationButton.addEventListener("click", getPosition);
