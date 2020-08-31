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
  let temperatureInCelsius = Math.round(response.data.main.temp);
  showTempCelsius.innerHTML = `${temperatureInCelsius}`;

  let feelsLike = document.querySelector("#feels-like");
  let sensation = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like ${sensation}°C`;

  let showHumidity = document.querySelector("#humidity");
  let humidity = Math.round(response.data.main.humidity);
  showHumidity.innerHTML = `${humidity}%`;

  let showWindSpeed = document.querySelector("#windspeed");
  let windSpeed = Math.round(response.data.wind.speed);
  showWindSpeed.innerHTML = `${windSpeed} km/h`;

  let weatherDescription = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  weatherDescription.innerHTML = `${description}`;

  // adjust big emoji

  let currentEmoji = document.querySelector("#temp-emoji");

  if (weatherDescription.innerText === "clear sky") {
    currentEmoji.innerHTML = `☀️`;
  } else if (weatherDescription.innerText === "few clouds") {
    currentEmoji.innerHTML = `🌤`;
  } else if (weatherDescription.innerText === "scattered clouds") {
    currentEmoji.innerHTML = `🌥`;
  } else if (weatherDescription.innerText === "broken clouds") {
    currentEmoji.innerHTML = `☁️`;
  } else if (weatherDescription.innerText === "shower rain") {
    currentEmoji.innerHTML = `🌧`;
  } else if (weatherDescription.innerText === "rain") {
    currentEmoji.innerHTML = `⛈`;
  } else if (weatherDescription.innerText === "light rain") {
    currentEmoji.innerHTML = `🌧`;
  } else if (weatherDescription.innerText === "thunderstorm") {
    currentEmoji.innerHTML = `🌩`;
  } else if (weatherDescription.innerText === "snow") {
    currentEmoji.innerHTML = `❄️`;
  } else if (weatherDescription.innerText === "mist") {
    currentEmoji.innerHTML = `🌫`;
  } else if (weatherDescription.innerText === "haze") {
    currentEmoji.innerHTML = `🌨`;
  } else if (weatherDescription.innerText === "tornado") {
    currentEmoji.innerHTML = `🌪`;
  } else {
    currentEmoji.innerHTML = `🌈`;
  }

  // Celsius to Fahrenheit

  toFahrenheit(temperatureInCelsius);
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

// Celsius to Fahrenheit

function toFahrenheit(temperatureInCelsius) {
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
}
