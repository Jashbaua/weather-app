import * as App from "./app";

//Dom cache
//Controls
const locationInp = document.querySelector("#location");
const checkWeatherBtn = document.querySelector("#check-weather-button");
const celcius = document.querySelector("#celcius");
const fahrenheit = document.querySelector("#fahrenheit");
//Output
const gifOpt=document.querySelector('#gif>img')
const temperatureOpt = document.querySelector("#temperature");
const precipprobOpt = document.querySelector("#precipitation-probability");
const conditionsOpt = document.querySelector("#conditions");
const descriptionOpt = document.querySelector("#description");

//Event binding
locationInp.addEventListener("input", validateLocation);
checkWeatherBtn.addEventListener("click", displayWeather);
celcius.addEventListener("click", toggleCelcius);
fahrenheit.addEventListener("click", toggleFahrenheit);

//Location
function validateLocation() {}
async function displayWeather() {
    let data = await App.fetchWeatherData(locationInp.value)
    gifOpt.src=data.gif
    temperatureOpt.textContent = data.temperature
    precipprobOpt.textContent = data.precipprob
    conditionsOpt.textContent = data.conditions
    descriptionOpt.textContent = data.description
}
function toggleCelcius() {}
function toggleFahrenheit() {}
