import * as App from "./app";

//Dom cache
//Controls
const locationInp = document.querySelector("#location");
const locationErr=document.querySelector('#location-error')
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
    try {
        let data = await App.fetchWeatherData(locationInp.value)
        gifOpt.src = data.gif
        temperatureOpt.textContent = data.temperature + '°F'
        precipprobOpt.textContent = data.precipprob
        conditionsOpt.textContent = data.conditions
        descriptionOpt.textContent = data.description
        locationErr.classList.remove('active')
    }
    catch (error) {
        locationErr.classList.add('active')
    }
}
function toCelcius(temp) {
    let value = temp.slice(0, -2)
    return Math.round((value-32)*5/9*100)/100+'°C'
}
function toggleCelcius() {
    if (!celcius.classList.contains('active')) {
        celcius.classList.add('active')
        fahrenheit.classList.remove('active')
    }
    temperatureOpt.textContent=toCelcius(temperatureOpt.textContent)
}
function toFahrenheit(temp) {
    let value = temp.slice(0, -2)
    return Math.round((value*9/5+32)*100)/100+'°F'
}
function toggleFahrenheit() {
    if (!fahrenheit.classList.contains('active')) {
        fahrenheit.classList.add('active')
        celcius.classList.remove('active')
    }
    temperatureOpt.textContent=toFahrenheit(temperatureOpt.textContent)
}

//Initializing UI
toggleFahrenheit()

