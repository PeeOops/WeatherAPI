const addCityButton = document.getElementById("add-city");
const cancelAddCityButton = document.getElementById("cancel");
const submitAddCityButton = document.getElementById("submit");
const modal = document.getElementById("modal");
const cityInput = document.getElementById("city");
const countryInput = document.getElementById("country");
const cityListDisplay = document.getElementById("cities");
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

// Set localStorage
if(!localStorage.getItem("cities")){
    localStorage.setItem("cities", JSON.stringify(defaultCity));
}

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

    cityListDisplay.textContent = "";
    showCityLists();

}

// Show City
const showCityLists = () => {
    const cityLists = JSON.parse(localStorage.getItem("cities") || "[]");

    if(cityLists.length === 0){
        const listCity = document.createElement("span");
        listCity.textContent = "No cities yet, add one!";
        cityListDisplay.appendChild(listCity);
    }

    cityLists.forEach(city => {
        const listCity = document.createElement("p");
        listCity.textContent = `${city.city}, ${city.country}`;
        cityListDisplay.appendChild(listCity);
    });
}

// Add City
submitAddCityButton.addEventListener("click", async () => {
    const city = cityInput.value.toLowerCase();
    const country = countryInput.value.toLowerCase();

    if(!city || !country){
        alert("Please check your input");
        return;
    }

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


