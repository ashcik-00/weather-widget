const API_Token = "08b97fa23ffcef5b7aa71c4d8ece97cc";

const currentWeather = document.querySelector(".current-conditions");
const forecast = document.querySelector(".forecast");
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getCurrentWeather = async function (lat, lon) {
  const targetUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_Token}`;
  const response = await fetch(targetUrl);
  const data = await response.json();
  return data;
};

const getFiveDaysWeather = async function (lat, lon) {
  const targetUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Token}`;
  const response = await fetch(targetUrl);
  const data = await response.json();
  return data;
};

function KelvinToCelsius(temperature) {
  return (temperature - 273.15).toFixed(0);
}

function renderCurrentWweather(iconId, celsiusTemp, condition) {
  currentWeather.insertAdjacentHTML(
    "afterbegin",
    `<h2>Current Conditions</h2>
        <img src="http://openweathermap.org/img/wn/${iconId}@2x.png" />
        <div class="current">
        <div class="temp">${celsiusTemp}℃</div>
        <div class="condition">${condition}</div>
        </div>`
  );
}

function loadweather() {
  navigator.geolocation.getCurrentPosition((coordinates) => {
    getCurrentWeather(
      coordinates.coords.latitude,
      coordinates.coords.longitude
    ).then((data) => {
      const iconId = data.weather[0].icon;
      const celsiusTemp = KelvinToCelsius(data.main.temp);
      const condition = data.weather[0].description;
      renderCurrentWweather(iconId, celsiusTemp, condition);
    });

    getFiveDaysWeather(
      coordinates.coords.latitude,
      coordinates.coords.longitude
    ).then((data) => console.log(data));
  });
}
