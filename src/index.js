let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let thisMonth = months[now.getMonth()];
let dayToday = days[now.getDay()];
let h2 = document.querySelector("div#date");
h2.innerHTML = dayToday + ", " + date + " " + thisMonth;
function formatTime(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let time = document.querySelector("div#current-hour");
time.innerHTML = formatTime(now);

//
function searchCurrentPosition(position) {
  let apiKey = "043e36fdeeee9cb7850e1d4205c4dd0a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}
let currentLoc = document.querySelector("button#current-location");
currentLoc.addEventListener("click", showLocation);
function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let newTemp = document.querySelector("span#current-temp");
  newTemp.innerHTML = `${temp}°C`;
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;
  document.querySelector(
    "div.humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "div.wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  let description = document.querySelector("div.description");
  description.innerHTML = `Weather description : ${response.data.weather[0].description}`;
}
function searchCity() {
  let apiKey = "043e36fdeeee9cb7850e1d4205c4dd0a";
  let city = document.querySelector("input#inputCity");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("input#inputCity");
  let h1 = document.querySelector("h1");
  h1.innerHTML = city.value;
  searchCity(city.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", enterCity);
