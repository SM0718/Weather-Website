const requestedLocation = document.getElementById("search-bar")
const script2 = document.createElement('script');
script2.src = "http://api.weatherapi.com/v1/current.json?key=4e3b57e2db9744dd9d1114135231411&q=London&aqi=yes&callback=handleWeatherData";
document.head.appendChild(script2);
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const weatherIcon = document.getElementById("weather-icon")
const temp = document.querySelector(".temp")
const weather = document.querySelector(".weather")
const date = document.querySelector(".date")
const dateTime = document.querySelector(".dateTime")
const dayNight = document.querySelector(".day-night")


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
const dayOfWeekNumber = currentDate.getDay();

fetch(`http://api.weatherapi.com/v1/current.json?key=4e3b57e2db9744dd9d1114135231411&q=Kolkata&aqi=yes`)
        .then(res => res.json())
        .then(data => divInfoUpdate(data))

requestedLocation.addEventListener("keydown", (e) => {
    const loc = e.target.value
    if(e.key === 'Enter' || e.keyCode === 13){
       fetch(`http://api.weatherapi.com/v1/current.json?key=4e3b57e2db9744dd9d1114135231411&q=${loc}&aqi=yes`)
        .then(res => res.json())
        .then(data => divInfoUpdate(data) ) 
}})

function divInfoUpdate(data){
        leftDivInfoUpdate(data)
        rightDivInfoUpdate(data)
}

function leftDivInfoUpdate(data){
    weatherIcon.src = data.current.condition.icon;
    temp.textContent = `${data.current.temp_c}°C`
    weather.textContent = data.current.condition.text;
    date.textContent = `${year}-${month}-${dayOfWeekNumber}`
    if(data.current.is_day === 0){
        dateTime.textContent = `${daysOfWeek[dayOfWeekNumber]}, ${data.location.localtime.split(" ")[1]}PM`
        dayNight.textContent = "Night"
    } else {
        dateTime.textContent = `${daysOfWeek[dayOfWeekNumber]}, ${data.location.localtime.split(" ")[1]}AM`
        dayNight.textContent = "Morning"
    }
    document.querySelector(".location").textContent = `${data.location.name}, ${data.location.country}`
}

const speed = document.querySelector(".weather-info")
const direction = document.querySelector(".wind-direction")
const humidityAmt = document.querySelector(".humidity")
const feelInfo = document.querySelector(".real-feel")
const uvInfo = document.querySelector(".uv")
const uvAmount = document.querySelector(".uv-info")
const pressure = document.querySelector("#pressure")
const pressureAmt = document.querySelector(".pressure")
const rain = document.querySelector("#rain")
const rainChance = document.querySelector(".rain-chance")
const rainInfo = document.querySelector(".rain-info")
const tempHistory = document.querySelector(".temp-history")
const sunRise = document.querySelector(".sun-rise")
const moonRise = document.querySelector(".moon-rise")

function rightDivInfoUpdate(data){
    speed.textContent = `${data.current.wind_kph} KM/h`
    direction.textContent = data.current.wind_dir
    humidityAmt.textContent = data.current.humidity
    feelInfo.textContent = `${data.current.feelslike_c}°C`
    uvInfo.textContent = data.current.uv
    if(data.current.uv <= 2){
        uvAmount.textContent = "Low"
    } else if(data.current.uv > 2 && data.current.uv <= 5){
        uvAmount.textContent = "Moderate"
    } else if(data.current.uv > 5 && data.current.uv <= 7){
        uvAmount.textContent = "High"
    } else if(data.current.uv > 7 && data.current.uv <= 10){
        uvAmount.textContent = "Very High"
    } else if(data.current.uv > 10){
        uvAmount.textContent = "Extreme"
    }
    pressureAmt.textContent = `${data.current.pressure_mb} mbbar`
    rainChance.textContent = `${data.current.condition.text}`
    tempHistory.textContent = `${data.current.air_quality.co}`
    sunRise.textContent = `${data.current.vis_km} KM`
    moonRise.textContent = `${data.current.air_quality.pm10} microns`
}