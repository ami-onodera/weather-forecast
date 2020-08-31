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

  showCurrent();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// integrate API

function showWeather(response) {
  let showTempCelsius = document.querySelector("#temp-number");
  showTempCelsius.innerHTML = Math.round(response.data.main.temp);
  console.log(Math.round(response.data.main.temp));
}

function showCurrent(response) {
  const apiKey = "e58056dbe2936b35eaec505d63e7a608";
  let searchInput = document.querySelector("#search-bar");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;
  let searchedCity = currentCity.innerText;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showWeather);
}
