// Data dinâmica

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDay = days[now.getDay()];
let hourNow = now.getHours();

let minutesNow = now.getMinutes();

if (minutesNow < 10) {
  minutesNow = "0" + minutesNow;
} else {
  minutesNow = minutesNow + "";
}

let showDate = document.querySelector("#current-date");
showDate.innerHTML = `${weekDay} ${hourNow}:${minutesNow}`;

// Display city that was searched

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = ` ${searchInput.value}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// Show Celsius or Fahrenheit temperatures

let temperatureInCelsius = 18;

function tempCelsius(event) {
  event.preventDefault();
  let showTempCelsius = document.querySelector("#temp-number");
  showTempCelsius.innerHTML = temperatureInCelsius;
}

let tempInCelsius = document.querySelector("#celsius-link");
tempInCelsius.addEventListener("click", tempCelsius);

function tempFahrenheit(event) {
  event.preventDefault();
  let temperatureInFahrenheit = (temperatureInCelsius * 9) / 5 + 32;
  let showTempFahrenheit = document.querySelector("#temp-number");
  showTempFahrenheit.innerHTML = temperatureInFahrenheit;
}

let tempInFahrenheit = document.querySelector("#fahrenheit-link");
tempInFahrenheit.addEventListener("click", tempFahrenheit);
