function handleSubmit(event) {
  event.preventDefault();
  let cityUser = document.querySelector("#city-input");
  cityUser = cityUser.value;
  search(cityUser);
}
function search(cityUser) {
  let urlApi = `https://api.shecodes.io/weather/v1/current?query=${cityUser}&key=4e3d43265f7f3448fot5bf7a6b40260b&units=metric`;
  axios.get(urlApi).then(showTemp);
}
function showCurrent() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlApi = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=4e3d43265f7f3448fot5bf7a6b40260b&units=metric`;
  axios.get(urlApi).then(showTemp);
}

function showTemp(response) {
  console.log(response.data);
  console.log(response.data.temperature.current);
  let tempRound = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#temperature");
  let weather = document.querySelector("#weather");
  let city = document.querySelector("#city");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let country = document.querySelector("#country");

  temperature.innerHTML = `${tempRound}`;
  weather.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  country.innerHTML = response.data.country;

  console.log(response.data);
}

function formatData() {
  let now = new Date();
  now.getMinutes(); // 0,1,2, 12
  now.getHours(); //1, 2, 3, 4
  now.getDate(); //1, 2, 3, 4
  now.getDay(); // 0, 1, 2
  now.getMonth(); // 0, 1, 2
  now.getFullYear(); // 2021
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = document.querySelector("#dayInWeek");
  day.innerHTML = days[now.getDay()];
  let hour = document.querySelector("#hour");
  hour.innerHTML = `${now.getHours()}`;
  if (now.getHours() < 10) {
    hour.innerHTML = `0${now.getHours()}`;
  }

  let minute = document.querySelector("#minute");
  minute.innerHTML = `${now.getMinutes()}`;
  if (now.getMinutes() < 10) {
    minute.innerHTML = `0${now.getMinutes()}`;
  }
}
formatData();
search("Zaporizhzhia");
let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrent);
