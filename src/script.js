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

// get hour for hourly forecast

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hourNow = date.getHours();
  let minutesNow = date.getMinutes();

  if (minutesNow < 10) {
    minutesNow = "0" + minutesNow;
  } else {
    minutesNow = minutesNow + "";
  }
  // let showHour = document.querySelector("#hour");
  // showHour.innerHTML = `${hourNow}:${minutesNow}`;
  return `${hourNow}:${minutesNow}`;
}
// Get current info by default

function retrievePosition(position) {
  const apiKey = "e58056dbe2936b35eaec505d63e7a608";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherApiUrl).then(showWeather);

  // get hourly forecast
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

// Button to get current city

function geoCurrent(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let getCurrentCity = document.querySelector("#current-city-button");
getCurrentCity.addEventListener("click", geoCurrent);

// Display city that was searched

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = ` ${searchInput.value}`;

  showCurrent();
}

function getEmoji(temperature) {
  const temperatureEmoji = {
    "clear sky": "☀️",
    "few clouds": "🌤",
    "scattered clouds": "🌥",
    "broken clouds": "☁️",
    "overcast clouds": "☁️",
    "shower rain": "🌧",
    rain: "⛈",
    "light rain": "🌧",
    "moderate rain": "🌧",
    thunderstorm: "🌩",
    snow: "❄️",
    mist: "🌫",
    haze: "🌨",
    tornado: "🌪",
    fog: "🌫",
    smoke: "🌫",
  };
  const fallbackEmoji = "🌈";

  return temperatureEmoji[temperature] || fallbackEmoji;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

// integrate API

function showWeather(response) {
  let showTempCelsius = document.querySelector("#temp-number");
  let temperatureInCelsius = Math.round(response.data.main.temp);
  showTempCelsius.innerHTML = `${temperatureInCelsius}`;

  let setCurrentCityAuto = document.querySelector("#current-city");
  setCurrentCityAuto.innerHTML = `${response.data.name}`;

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

  let currentEmoji = document.querySelector("#temp-emoji");

  currentEmoji.innerHTML = getEmoji(weatherDescription.innerText);

  // set background

  let currentBackground = document.getElementById("background-image");

  if (weatherDescription.innerText === "clear sky") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/clear-sky.svg)"
    );
  } else if (weatherDescription.innerText === "few clouds") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/windy.svg)"
    );
  } else if (weatherDescription.innerText === "scattered clouds") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/windy.svg)"
    );
  } else if (weatherDescription.innerText === "broken clouds") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/cloudy.png)"
    );
  } else if (weatherDescription.innerText === "shower rain") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/rain.png)"
    );
  } else if (weatherDescription.innerText === "rain") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/rain.png)"
    );
  } else if (weatherDescription.innerText === "light rain") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/rain2.png)"
    );
  } else if (weatherDescription.innerText === "moderate rain") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/rain.png)"
    );
  } else if (weatherDescription.innerText === "thunderstorm") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/rain2.png)"
    );
  } else if (weatherDescription.innerText === "snow") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/snow.svg)"
    );
  } else if (weatherDescription.innerText === "mist") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/wind2.svg)"
    );
  } else if (weatherDescription.innerText === "haze") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/alt1.svg)"
    );
  } else if (weatherDescription.innerText === "fog") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/wind2.svg)"
    );
  } else if (weatherDescription.innerText === "smoke") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/wind2.svg)"
    );
  } else if (weatherDescription.innerText === "overcast clouds") {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/cloudy.png)"
    );
  } else {
    currentBackground.setAttribute(
      "style",
      "background-image: url(img/else2.svg)"
    );
  }

  // Celsius to Fahrenheit

  toFahrenheit(temperatureInCelsius);
}

// hourly forecast

function displayForecast(response) {
  let forecastElement = document.getElementById("hour-forecast");
  forecastElement.innerHTML = null;

  console.log(response);

  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    let emoji = getEmoji(forecast.weather[0].description);

    forecastElement.innerHTML += `
      <div class="col-2 ml-1 md-1 hour">
        <p id="hour"><strong>${formatHours(forecast.dt * 1000)}</strong></p>
        <p class="small-emoji">${emoji}</p>
        <p>${Math.ceil(forecast.main.temp_max)}° | ${Math.floor(
      forecast.main.temp_min
    )}°</p>
      </div>
    `;
  }
}

// current temp and forecast

function showCurrent() {
  const apiKey = "e58056dbe2936b35eaec505d63e7a608";
  let searchInput = document.querySelector("#search-bar");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;
  let searchedCity = currentCity.innerText;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  // get hour forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=metric`;

  // console.log(`THIS IS THE API URL ${apiUrl}`);

  axios.get(apiUrl).then(displayForecast);
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
