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

// Get current info by default

function retrievePosition(position) {
  const apiKey = "e58056dbe2936b35eaec505d63e7a608";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
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

  // adjust big emoji

  // let currentEmoji = document.querySelector("#temp-emoji");

  // if (weatherDescription.innerText === "clear sky") {
  //   currentEmoji.innerHTML = `☀️`;
  // } else if (weatherDescription.innerText === "few clouds") {
  //   currentEmoji.innerHTML = `🌤`;
  // } else if (weatherDescription.innerText === "scattered clouds") {
  //   currentEmoji.innerHTML = `🌥`;
  // } else if (weatherDescription.innerText === "broken clouds") {
  //   currentEmoji.innerHTML = `☁️`;
  // } else if (weatherDescription.innerText === "shower rain") {
  //   currentEmoji.innerHTML = `🌧`;
  // } else if (weatherDescription.innerText === "rain") {
  //   currentEmoji.innerHTML = `⛈`;
  // } else if (weatherDescription.innerText === "light rain") {
  //   currentEmoji.innerHTML = `🌧`;
  // } else if (weatherDescription.innerText === "thunderstorm") {
  //   currentEmoji.innerHTML = `🌩`;
  // } else if (weatherDescription.innerText === "snow") {
  //   currentEmoji.innerHTML = `❄️`;
  // } else if (weatherDescription.innerText === "mist") {
  //   currentEmoji.innerHTML = `🌫`;
  // } else if (weatherDescription.innerText === "haze") {
  //   currentEmoji.innerHTML = `🌨`;
  // } else if (weatherDescription.innerText === "tornado") {
  //   currentEmoji.innerHTML = `🌪`;
  // } else {
  //   currentEmoji.innerHTML = `🌈`;
  // }

  let currentEmoji = document.querySelector("#temp-emoji");

  const temperatureEmoji = {
    "clear sky": "☀️",
    "few clouds": "🌤",
    "scattered clouds": "🌥",
    "broken clouds": "☁️",
    "overcast clouds": "☁️",
    "shower rain": "🌧",
    rain: "⛈",
    "light rain": "🌧",
    thunderstorm: "🌩",
    snow: "❄️",
    mist: "🌫",
    haze: "🌨",
    tornado: "🌪",
    fog: "🌫",
  };
  const fallbackEmoji = "🌈";

  currentEmoji.innerHTML =
    temperatureEmoji[weatherDescription.innerText] || fallbackEmoji;

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
