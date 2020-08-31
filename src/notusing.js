let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

function temperature() {
  let city = prompt("Enter a city");
  city = city.toLowerCase().trim();

  if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let celsius = Math.round(temperature);
    let fahrenheit = Math.round((temperature * 9) / 5 + 32);

    alert(
      `It is currently ${celsius}°C (${fahrenheit}°F) in ${city} with a humidity of ${weather[city].humidity}%`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for ${city}, try going to https://www.google.com/search?q=weather+${city}`
    );
  }
}

temperature();

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
