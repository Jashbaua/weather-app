import * as App from "./app";

//Dom cache
//Controls
const locationInp = document.querySelector("#location");
const locationErr=document.querySelector('#location-error')
const checkWeatherBtn = document.querySelector("#check-weather-button");
const celcius = document.querySelector("#celcius");
const fahrenheit = document.querySelector("#fahrenheit");
//Output
const optData=document.querySelector('#data')
const gifOpt = document.querySelector('#gif>img')
const gifWaiting=document.querySelector('#waiting-gif')
const temperatureOpt = document.querySelector("#temperature");
const precipprobOpt = document.querySelector("#precipitation-probability");
const conditionsOpt = document.querySelector("#conditions");
const descriptionOpt = document.querySelector("#description");

//Event binding
checkWeatherBtn.addEventListener("click", displayWeather);
celcius.addEventListener("click", toggleCelcius);
fahrenheit.addEventListener("click", toggleFahrenheit);

//Location
function hideData() {
    gifOpt.style.opacity=0
    optData.style.opacity=0
 }
function showData() { 
    gifOpt.style.opacity=1
    optData.style.opacity=1
}
function hideWaiting() { 
    gifWaiting.style.opacity=0
}
function showWaiting() { 
    gifWaiting.style.opacity=1
}

async function displayWeather() {
    try {
        hideData()
        showWaiting()
        let data = await App.fetchWeatherData(locationInp.value)
        gifOpt.src='#'
        gifOpt.src = data.gif
        temperatureOpt.textContent = data.temperature + '°F'
        if(celcius.classList.contains('active'))toggleCelcius()
        precipprobOpt.textContent = data.precipprob
        conditionsOpt.textContent = data.conditions
        descriptionOpt.textContent = data.description
        locationErr.classList.remove('active')
        await new Promise((resolve)=>setTimeout(resolve, 3000))
        hideWaiting()
        showData()
    }
    catch (error) {
        locationErr.classList.add('active')
        hideWaiting()
        hideData()
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
gifOpt.style.opacity = 0
optData.style.opacity=0
gifWaiting.style.opacity=0
