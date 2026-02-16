const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityName = document.getElementById("city");
const temperature = document.getElementById("temp");
const errorMessageContainer = document.getElementById("error-message-container");
const errorMessage = document.getElementById("error-message");
const weatherIcon = document.getElementById("weather-icon");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");


function returnWeather(){
    return JSON.parse(localStorage.getItem("previousweatherdata")||"[]");
}

function addToLocalstorage(item){
    localStorage.setItem("previousweatherdata", JSON.stringify(item))
}


searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        ErrorMessage("Please enter a city name.");
        return;
    };
    fetchWeather(city);
    // renderWeather()
    cityInput.value = "";
});

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city === "") {
            ErrorMessage("Please enter a city name.");
            return;
        };
        fetchWeather(city);
        cityInput.value = "";
    }
});


async function fetchWeather(city) {
    try {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=97aefab766c848718f74f05c53b5b7ab`);
    let data = await response.json();
    const weatherData = data.data[0];
    console.log(data);
    const previousweatherdata = returnWeather()
    
    const newdata = {
        cityName:weatherData.city_name,
        temp:`${Math.round(weatherData.temp)}°C`,
        humidity: `${weatherData.rh}%`,
        windSpeed: `${weatherData.wind_spd} km/h`,
        weatherIcon:`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`
    };

    previousweatherdata.push(newdata);
    addToLocalstorage(previousweatherdata);
    renderWeather(newdata);

    } catch (error) {
        ErrorMessage("City not found. Please try again.");
    }
}

function ErrorMessage(message){
    errorMessageContainer.style.display = "block";
    // errorMessageContainer.showModal();
    errorMessage.textContent = message;
    setTimeout(() => {
        errorMessageContainer.style.display = "none";
    }, 1000);

}


function renderWeather(data){
    cityName.innerHTML = data.cityName;
    temperature.innerHTML = data.temp;
    humidity.innerHTML =  data.humidity;
    windSpeed.innerHTML = data.windSpeed;
    weatherIcon.src = data.weatherIcon;
}

function printDataToScreen(){
    const data = returnWeather();
    data.forEach(
        renderWeather
    );
}

printDataToScreen();


/// Pattern Fetch Store Render