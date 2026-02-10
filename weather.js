const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityName = document.getElementById("city");
const temperature = document.getElementById("temp");
const errorMessageContainer = document.getElementById("error-message-container");
const errorMessage = document.getElementById("error-message");
const weatherIcon = document.getElementById("weather-icon");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");

// errorMessageContainer.style.display = "block";

searchButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        ErrorMessage("Please enter a city name.");
        return;
    };
    fetchWeather(city);
    cityInput.value = "";
});


async function fetchWeather(city) {
    try {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=97aefab766c848718f74f05c53b5b7ab`);
    let data = await response.json();
    weatherData = data.data[0];

    cityName.innerHTML = weatherData.city_name;
    temperature.innerHTML = `${Math.round(weatherData.temp)}°C`;
    humidity.innerHTML =  weatherData.rh;
    windSpeed.innerHTML = weatherData.wind_spd;
    weatherIcon.src =`https://www.weatherbit.io/static/img/icons/${weatherData.weather.icon}.png`;

    } catch (error) {
        ErrorMessage("City not found. Please try again.");
    }
}

function ErrorMessage(message){
    errorMessageContainer.style.display = "block";
    errorMessage.textContent = message;
    setTimeout(() => {
        errorMessageContainer.style.display = "none";
    }, 2000);

}