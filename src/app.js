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

navigator.geolocation.getCurrentPosition((coordinates) => {
  getCurrentWeather(
    coordinates.coords.latitude,
    coordinates.coords.longitude
  ).then((data) => console.log(data));
});
