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
const todayForecasts = document.getElementById("today-forecasts");
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
    { code: 0, description: "Clear sky", headerPosition: "-430px -10px", todayPosition: "-215px -5px" },
    { code: 1, description: "Mainly clear", headerPosition: "-300px 0", todayPosition: "-150px 0px" },
    { code: 2, description: "Partly cloudy", headerPosition: "-150px 0", todayPosition: "-75px 0px" },
    { code: 3, description: "Overcast", headerPosition: "0 -20px", todayPosition: "0px -10px" },
  
    // Fog & Visibility
    { code: 45, description: "Fog", headerPosition: "-300px -300px", todayPosition: "-150px -150px" },
    { code: 48, description: "Depositing rime fog", headerPosition: "-300px -300px", todayPosition: "-150px -150px" },
  
    // Drizzle
    { code: 51, description: "Light drizzle", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 53, description: "Moderate drizzle", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 55, description: "Dense drizzle", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 56, description: "Light freezing drizzle", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 57, description: "Dense freezing drizzle", headerPosition: "0 -150px", todayPosition: "0px -75px" },
  
    // Rain
    { code: 61, description: "Slight rain", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 63, description: "Moderate rain", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 65, description: "Heavy rain", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 66, description: "Light freezing rain", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 67, description: "Heavy freezing rain", headerPosition: "0 -150px", todayPosition: "0px -75px" },
  
    // Snow
    { code: 71, description: "Slight snow fall", headerPosition: "-300px -150px", todayPosition: "-150px -75px" },
    { code: 73, description: "Moderate snow fall", headerPosition: "-300px -150px", todayPosition: "-150px -75px" },
    { code: 75, description: "Heavy snow fall", headerPosition: "-300px -150px", todayPosition: "-150px -75px" },
    { code: 77, description: "Snow grains", headerPosition: "-300px -150px", todayPosition: "-150px -75px" },
  
    // Rain Showers
    { code: 80, description: "Slight rain showers", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 81, description: "Moderate rain showers", headerPosition: "0 -150px", todayPosition: "0px -75px" },
    { code: 82, description: "Violent rain showers", headerPosition: "0 -150px", todayPosition: "0px -75px" },
  
    // Snow Showers
    { code: 85, description: "Slight snow showers", headerPosition: "-300px -150px", todayPosition: "-150px -75px" },
    { code: 86, description: "Heavy snow showers", headerPosition: "-300px -150px", todayPosition: "-150px -75px" },
  
    // Thunderstorms
    { code: 95, description: "Thunderstorm (no hail)", headerPosition: "-150px -150px", todayPosition: "-75px -75px" },
    { code: 96, description: "Thunderstorm with slight hail", headerPosition: "-450px -150px", todayPosition: "-225px -75px" },
    { code: 99, description: "Thunderstorm with heavy hail", headerPosition: "-450px -150px", todayPosition: "-225px -75px" }
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
        // Group city and delete buttons
        const bracketCity = document.createElement("div");
        bracketCity.classList.add("brackets");
        cityListText.appendChild(bracketCity);

        // City list
        const listCity = document.createElement("p");
        listCity.textContent = `${city.city}, ${city.country}`;
        listCity.classList.add("cities-default");

        // Delete button
        const deleteCity = document.createElement("p");
        deleteCity.textContent = "X";
        deleteCity.classList.add("cities-default");
        
        listCity.addEventListener("click", () => {
            // Remove 'selected' class from all <p> tags inside cityListText
            const allCities = cityListText.querySelectorAll("p");
            allCities.forEach(p => p.classList.remove("selected"));

            // Add 'selected' to the clicked one
            listCity.classList.add("selected");
            const cityLat = city.lat;
            const cityLon = city.lon;
            weatherInfo(cityLat, cityLon);
            sevenDayForecasts(cityLat, cityLon);
        })

        deleteCity.addEventListener("click", () => {
            const cityLists = JSON.parse(localStorage.getItem("cities") || "[]");

            const findCity = cityLists.findIndex(list => list.city === city.city || list.country === city.country);

            if(findCity !== -1){
                cityLists.splice(findCity,1);

                localStorage.setItem("cities", JSON.stringify(cityLists));
            }

            showCityLists();
        })

        bracketCity.appendChild(listCity);
        bracketCity.appendChild(deleteCity);
    });
}

// Show weather information

const showWeather = (data) => {
    // Header Weather Image
    let backgroundPosition = "";
    const weatherBackgroundPosition = weatherCodes.find(weather => weather.code === data.current.weather_code);
    if(weatherBackgroundPosition.code === 0 && data.current.is_day === 1){
        backgroundPosition = "-430px -10px";
    }else if(weatherBackgroundPosition.code === 0 && data.current.is_day === 0){
        backgroundPosition = "-450px -300px";
    }else if((weatherBackgroundPosition.code >= 1 && weatherBackgroundPosition.code <= 3) && data.current.is_day === 0){
        backgroundPosition = "-150px -295px";
    }else{
        backgroundPosition = weatherBackgroundPosition.headerPosition;
    }

    // Header
    headerTitleText.textContent = `Timezone: ${data?.timezone ?? "-"}`;
    headerWeatherImage.style.backgroundPosition = backgroundPosition;
    chanceOfRainText.textContent = `Chance of rain: ${parseFloat(data?.daily.precipitation_probability_max) ?? "-"}%`;
    temperatureText.textContent = `${parseFloat(data?.current?.temperature_2m).toFixed(1)}\u00B0C`;

    // Today's forecasts    
    todayForecasts.innerHTML = "";
    for(let i = 0; i < data.hourly.weather_code.length; i = i + 4){
        const todayImagePosition = weatherCodes.find(weather => weather.code === data.hourly.weather_code[i]);

        todayForecasts.innerHTML += `
            <div class="time">
                <p>${i}:00 ${i >= 12 ? "PM" : "AM"}</p>
                <div class="today-weather" style="background-position: ${(data?.hourly?.is_day[i] === 0 && todayImagePosition?.code === 0) ? "-225px -150px" : (todayImagePosition?.code >= 1 && todayImagePosition?.code <= 3) && data?.hourly?.is_day[i] === 0 ? "-75px -147px" : todayImagePosition?.todayPosition }"></div>
                <p>${data?.hourly?.temperature_2m[i] ?? "-"}\u00B0C</p>
            </div>
        `
    }

    // Air condition
    realFeelText.textContent = `${parseFloat(data?.current?.apparent_temperature).toFixed(1)}\u00B0C`;
    windSpeedText.textContent = `${data?.current?.wind_speed_10m ?? "-"} km/h`;
    uvIndexText.textContent = `${data?.daily?.uv_index_max ?? "-"}`;
    humidityText.textContent = `${data?.current?.relative_humidity_2m ?? "-"}%`;
    const currentWeatherCondition = weatherCodes.find(weather => weather.code === data.current.weather_code);
    currentWeatherText.textContent = currentWeatherCondition?.description ?? "-";
    dayNightText.textContent = data?.current?.is_day === 1 ? "Day" : data?.current?.is_day === 0 ? "Night" : "-";
}

// Show 7 day forecasts
const showSevenDayForecasts = (data) => {
    sevenDayForecastsDisplay.innerHTML = "";

    for(let i = 0; i <= 6; i++){
        const date = data?.daily?.time[i];
        const weather = weatherCodes.find(weather => weather.code === data?.daily?.weather_code[i]);
        const maxTemperature = parseFloat(data?.daily?.temperature_2m_max[i]);
        const minTemperature = parseFloat(data?.daily?.temperature_2m_min[i]);
        const apparentMaxTemp = parseFloat(data?.daily?.apparent_temperature_max[i]);
        const apparentMinTemp = parseFloat(data?.daily?.apparent_temperature_min[i]);

        sevenDayForecastsDisplay.innerHTML += `
            <div class="forecast">
                <p>${date.slice(-2)}-${date.substr(5,2)}-${date.substr(0,4)}</p>
                <p>${weather?.description}</p>
                <p>${((maxTemperature + minTemperature) / 2).toFixed(1)}/<span class="temp-feel">${((apparentMaxTemp + apparentMinTemp) / 2).toFixed(1)}</span></p>
            </div>
        `
    }



    
}

// Loading on fetch
const loadingWeather = () => {
    headerTitleText.textContent = "Loading weather...";
    chanceOfRainText.textContent = "";
    temperatureText.textContent = "";
}


// Fetch current weather information
const weatherInfo = async (lat,lon) => {
    try {
        
        loadingWeather();

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,precipitation_probability_max&hourly=weather_code,temperature_2m,is_day&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,precipitation,is_day&timezone=auto&forecast_days=1`,
            {
                headers: {
                    "User-Agent": "WeatherAPI/1.0 (https://github.com/PeeOops)"
                }
            }
        );
        if(!response.ok){
            throw new Error(`Error : ${response.status}`);
        }
        const data = await response.json();
        showWeather(data);


    } catch (error) {
        console.log(`Fetch failed:`, error.message);
        alert("An error occurred while fetching weather information.");
    }
}

// Fetch 7-day forecasts
const sevenDayForecasts = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&timezone=auto`,
            {
                headers: {
                    "User-Agent": "WeatherAPI/1.0 (https://github.com/PeeOops)"
                }
            }
        )

        if(!response.ok){
            throw new Error(`Error : ${response.status}`);
        }

        const data = await response.json();
        showSevenDayForecasts(data);

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


