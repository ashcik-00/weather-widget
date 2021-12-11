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

function getDay(date) {
  return weekDays[new Date(date).getDay()];
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

function renderForecast(forecastInformation) {
  let html = "";

  for (let i = 0; i < 5; i++) {
    html += `<div class="day">
        <h3>${getDay(forecastInformation.dates[i])}</h3>
        <img src="http://openweathermap.org/img/wn/${
          forecastInformation.icons[i]
        }@2x.png" />
        <div class="description">${forecastInformation.descriptions[i]}</div>
        <div class="temp">
          <span class="high">${
            forecastInformation.max_temp[i]
          }℃</span>/<span class="low">${forecastInformation.min_temp[i]}℃</span>
        </div>
      </div>`;
  }
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
    ).then((data) => {
      const firstDay = data.list[0];
      const secondDay = data.list[8];
      const thirdDay = data.list[16];
      const fourthDay = data.list[24];
      const fifthDay = data.list[32];
      const minTempArr = [];
      const maxTempArr = [];

      let minAux = Number.MAX_VALUE;
      let maxAux = Number.MIN_VALUE;

      for (let i = 0; i <= data.list.length - 8; i += 8) {
        minAux = Number.MAX_VALUE;
        maxAux = Number.MIN_VALUE;
        for (let j = i; j < i + 7; j++) {
          if (data.list[j].main.temp_min < minAux) {
            minAux = data.list[j].main.temp_min;
          }
          if (data.list[j].main.temp_max > maxAux) {
            maxAux = data.list[j].main.temp_max;
          }
        }
        minTempArr.push(KelvinToCelsius(minAux));
        maxTempArr.push(KelvinToCelsius(maxAux));
      }

      const datesArr = [
        firstDay.dt_txt,
        secondDay.dt_txt,
        thirdDay.dt_txt,
        fourthDay.dt_txt,
        fifthDay.dt_txt,
      ];
      const iconsArr = [
        firstDay.weather[0].icon,
        secondDay.weather[0].icon,
        thirdDay.weather[0].icon,
        fourthDay.weather[0].icon,
        fifthDay.weather[0].icon,
      ];
      const descArr = [
        firstDay.weather[0].description,
        secondDay.weather[0].description,
        thirdDay.weather[0].description,
        fourthDay.weather[0].description,
        fifthDay.weather[0].description,
      ];
      const forecastInformation = {
        dates: datesArr,
        icons: iconsArr,
        descriptions: descArr,
        min_temp: minTempArr,
        max_temp: maxTempArr,
      };

      renderForecast(forecastInformation);
    });
  });
}
