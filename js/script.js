const addCityButton = document.getElementById("add-city");
const cancelAddCityButton = document.getElementById("cancel");
const submitAddCityButton = document.getElementById("submit");
const modal = document.getElementById("modal");
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const cityListText = document.getElementById("cities");
const headerTitleText = document.getElementById("header-title");
const headerWeatherImage = document.getElementById("header-image");
const chanceOfRainText = document.getElementById("chance-of-rain");
const temperatureText = document.getElementById("temperature");
const realFeelText = document.getElementById("real-feel");
const windSpeedText = document.getElementById("wind-speed");
const uvIndexText = document.getElementById("uv-index");
const humidityText = document.getElementById("humidity");
const currentWeatherText = document.getElementById("current-weather");
const dayNightText = document.getElementById("day-night");
const tempOneText = document.getElementById("temp-1");
const tempTwoText = document.getElementById("temp-2");
const tempThreeText = document.getElementById("temp-3");
const tempFourText = document.getElementById("temp-4");
const tempFiveText = document.getElementById("temp-5");
const tempSixText = document.getElementById("temp-6");
const contentDisplay = document.getElementById("content");
const sevenDayForecastsDisplay = document.getElementById("forecasts");




// Modal
addCityButton.addEventListener("click", () => {
    modal.showModal();
})

cancelAddCityButton.addEventListener("click", () => {
    cityInput.value = "";
    countryInput.value = "";
    modal.close();
})

// Default City List
const defaultCity = [
    {
        city: "Berlin",
        country: "Germany",
        lat: 52.5108850,
        lon: 13.3989367
    },
    {
        city: "Seoul",
        country: "South Korea",
        lat: 37.5666791,
        lon: 126.9782914
    },
]

// WeatherCode

const weatherCodes = [
    // Clear & Cloudy
    { code: 0, description: "Clear sky" },
    { code: 1, description: "Mainly clear" },
    { code: 2, description: "Partly cloudy" },
    { code: 3, description: "Overcast" },
  
    // Fog & Visibility
    { code: 45, description: "Fog" },
    { code: 48, description: "Depositing rime fog" },
  
    // Drizzle
    { code: 51, description: "Light drizzle" },
    { code: 53, description: "Moderate drizzle" },
    { code: 55, description: "Dense drizzle" },
    { code: 56, description: "Light freezing drizzle" },
    { code: 57, description: "Dense freezing drizzle" },
  
    // Rain
    { code: 61, description: "Slight rain" },
    { code: 63, description: "Moderate rain" },
    { code: 65, description: "Heavy rain" },
    { code: 66, description: "Light freezing rain" },
    { code: 67, description: "Heavy freezing rain" },
  
    // Snow
    { code: 71, description: "Slight snow fall" },
    { code: 73, description: "Moderate snow fall" },
    { code: 75, description: "Heavy snow fall" },
    { code: 77, description: "Snow grains" },
  
    // Rain Showers
    { code: 80, description: "Slight rain showers" },
    { code: 81, description: "Moderate rain showers" },
    { code: 82, description: "Violent rain showers" },
  
    // Snow Showers
    { code: 85, description: "Slight snow showers" },
    { code: 86, description: "Heavy snow showers" },
  
    // Thunderstorms
    { code: 95, description: "Thunderstorm (no hail)" },
    { code: 96, description: "Thunderstorm with slight hail" },
    { code: 99, description: "Thunderstorm with heavy hail" }
  ];

// Set localStorage
if(!localStorage.getItem("cities")){
    localStorage.setItem("cities", JSON.stringify(defaultCity));
}

// Add city
const addCity = (data) => {

    const cityLists = JSON.parse(localStorage.getItem("cities") || "[]");

    if(data.length === 0){
        alert("Invalid city or country name");
        return;
    }

    const newCity = data.map(item => ({
        city: item.name,
        country: item.address.country,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon)
        
    }))[0];

    // Check for duplicate city
    const exists = cityLists.some(item => item.city === newCity.city && item.country === newCity.country);
    if (exists) {
        alert("City already exists in the list.");
        return;
    }

    cityLists.push(newCity);

    localStorage.setItem("cities",JSON.stringify(cityLists));

    cityListText.textContent = "";
    showCityLists();

}

// Show City
const showCityLists = () => {
    cityListText.textContent = "";
    
    const cityLists = JSON.parse(localStorage.getItem("cities") || "[]");

    if(cityLists.length === 0){
        const listCity = document.createElement("span");
        listCity.textContent = "No cities yet, add one!";
        cityListText.appendChild(listCity);
    }

    cityLists.forEach(city => {
        const listCity = document.createElement("p");
        listCity.textContent = `${city.city}, ${city.country}`;
        listCity.classList.add("cities-default");

        listCity.addEventListener("click", () => {
            // Remove 'selected' class from all <p> tags inside cityListText
            const allCities = cityListText.querySelectorAll("p");
            allCities.forEach(p => p.classList.remove("selected"));

            // Add 'selected' to the clicked one
            listCity.classList.add("selected");
            const cityLat = city.lat;
            const cityLon = city.lon;
            weatherInfo(cityLat, cityLon);
        })

        cityListText.appendChild(listCity);
    });
}

// Show weather information

const showWeather = (data) => {
    // Weather Image
    let backgroundPosition = "";
    if (data.current.weather_code === 0 && data.current.is_day === 1) {
        backgroundPosition = "-450px 0"; // Clear day
    } else if (data.current.weather_code === 0 && data.current.is_day === 0) {
        backgroundPosition = "-450px -300px"; // Clear night
    } else if ((data.current.weather_code >= 1 && data.current.weather_code <= 3) && data.current.is_day === 0) {
        backgroundPosition = "-150px -300px"; // Cloudy night
    } else if (data.current.weather_code === 3) {
        backgroundPosition = "0 0"; // Overcast
    } else if (data.current.weather_code === 2) {
        backgroundPosition = "-150px 0"; // Partly cloudy
    } else if (data.current.weather_code === 1) {
        backgroundPosition = "-300px 0"; // Mostly clear
    } else if (data.current.weather_code >= 45 && data.current.weather_code <= 48) {
        backgroundPosition = "-300px -300px"; // Fog or rime fog
    } else if ((data.current.weather_code >= 51 && data.current.weather_code <= 67) || (data.current.weather_code >= 80 && data.current.weather_code <= 82)) {
        backgroundPosition = "0 -150px"; // Drizzle or rain showers
    } else if (data.current.weather_code === 95) {
        backgroundPosition = "-150px -150px"; // Thunderstorm
    } else if (data.current.weather_code >= 96 && data.current.weather_code <= 99) {
        backgroundPosition = "-450px -150px"; // Thunderstorm with hail
    } else if ((data.current.weather_code >= 71 && data.current.weather_code <= 77) || 
               (data.current.weather_code >= 85 && data.current.weather_code <= 86)) {
        backgroundPosition = "-300px -150px"; // Snow or snow showers
    }

    // Header
    headerTitleText.textContent = `Timezone: ${data?.timezone ?? "-"}`;
    headerWeatherImage.style.backgroundPosition = backgroundPosition;
    chanceOfRainText.textContent = `Chance of rain: ${parseFloat(data?.daily.precipitation_probability_max) ?? "-"}%`;
    temperatureText.textContent = `${parseFloat(data?.current?.temperature_2m).toFixed(1)}\u00B0C`;

    // Today's forecasts
    tempOneText.textContent = `${data?.hourly?.temperature_2m[0] ?? "-"}\u00B0C`;
    tempTwoText.textContent = `${data?.hourly?.temperature_2m[3] ?? "-"}\u00B0C`;
    tempThreeText.textContent = `${data?.hourly?.temperature_2m[7] ?? "-"}\u00B0C`;
    tempFourText.textContent = `${data?.hourly?.temperature_2m[11] ?? "-"}\u00B0C`;
    tempFiveText.textContent = `${data?.hourly?.temperature_2m[15] ?? "-"}\u00B0C`;
    tempSixText.textContent = `${data?.hourly?.temperature_2m[19] ?? "-"}\u00B0C`;

    // Air condition
    realFeelText.textContent = `${parseFloat(data?.current?.apparent_temperature).toFixed(1)}\u00B0C`;
    windSpeedText.textContent = `${data?.current?.wind_speed_10m ?? "-"} km/h`;
    uvIndexText.textContent = `${data?.daily?.uv_index_max ?? "-"}`;
    humidityText.textContent = `${data?.current?.relative_humidity_2m ?? "-"}%`;
    const currentWeatherCondition = weatherCodes.find(weather => weather.code === data.current.weather_code);
    currentWeatherText.textContent = currentWeatherCondition?.description ?? "-";
    dayNightText.textContent = data?.current?.is_day === 1 ? "Day" : data?.current?.is_day === 0 ? "Night" : "-";
}

// Loading on fetch
const loadingWeather = () => {
    headerTitleText.textContent = "Loading weather...";
    chanceOfRainText.textContent = "";
    temperatureText.textContent = "";
}


// Fetch weather information
const weatherInfo = async (lat,lon) => {
    try {
        
        loadingWeather();

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,precipitation_probability_max&hourly=weather_code,temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,precipitation,is_day&timezone=auto&forecast_days=1`);
        if(!response.ok){
            throw new Error(`Error : ${response.status}`)
        }
        const data = await response.json();
        showWeather(data);


    } catch (error) {
        console.log(`Fetch failed:`, error.message);
        alert("An error occurred while fetching weather information.");
    }
}



// Add city button
submitAddCityButton.addEventListener("click", async () => {
    const city = cityInput.value.trim().toLowerCase();
    const country = countryInput.value.trim().toLowerCase();

    if(!city || !country){
        alert("Please check your input");
        return;
    }

    // Fetch city
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&addressdetails=1`);

        if(!response.ok){
            throw new Error(`Error : ${response.status}`)
        }

        const data = await response.json();
        addCity(data);

    } catch (error) {
        console.log(`Fetch failed:`, error.message);
        alert("An error occurred while fetching city data.");
    }

    // Close modal
    cityInput.value = "";
    countryInput.value = "";
    modal.close();


})

showCityLists();


