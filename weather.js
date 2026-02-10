const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityName = document.getElementById("city");
const temperature = document.getElementById("temp");
const errorMessageContainer = document.getElementById("error-message-container");
const errorMessage = document.getElementById("error-message");
const weatherIcon = document.getElementById("weather-icon");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

errorMessageContainer.style.display = "none";

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        errorMessageContainer.style.display = "block";
        errorMessage.textContent = "Please enter a city name.";
        setTimeout(() => {
            errorMessageContainer.style.display = "none";
        }, 1000);
        cityName.textContent = "";
        temperature.textContent = "";
        humidity.textContent = "";
        windSpeed.textContent = "";
        return;
    };
    fetchWeather(city);
    cityInput.value = "";
});


async function fetchWeather(city) {
    try {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=97aefab766c848718f74f05c53b5b7ab`);
    let data = await response.json()
    console.log(data);
    weatherData = data.data[0];
    cityName.innerHTML = weatherData.city_name;
    temperature.innerHTML = `${Math.round(weatherData.temp)}°C`;
    humidity.innerHTML =  weatherData.rh;
    windSpeed.innerHTML = weatherData.wind_spd;
    weatherIcon.src =`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`;
    } catch (error) {
        errorMessageContainer.style.display = "block";
        errorMessage.textContent = "City not found. Please try again.";
         setTimeout(() => {
            errorMessageContainer.style.display = "none";
        }, 1000);
        cityName.textContent = "";
        temperature.textContent = "";
    }
}

