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
        city: "Jakarta",
        country: "Indonesia",
        lat: -6.1754049,
        lon: 106.8271680
    },
]

// Set localStorage
if(!localStorage.getItem("cities")){
    localStorage.setItem("cities", JSON.stringify(defaultCity));
}

const addCity = (data) => {

    const cityLists = JSON.parse(localStorage.getItem("cities") || []);

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

    cityLists.push(newCity);

    localStorage.setItem("cities",JSON.stringify(cityLists));
}

// Show City
const showCityLists = () => {
    
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


