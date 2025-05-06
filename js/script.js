const addCityButton = document.getElementById("add-city");
const cancelAddCityButton = document.getElementById("cancel");
const submitAddCityButton = document.getElementById("submit");
const modal = document.getElementById("modal");
const cityInput = document.getElementById("city");
const cityList = document.getElementById("cities");
const content = document.getElementById("content");
const sevenDayForecasts = document.getElementById("forecasts");



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
        id: 1,
        city: "Berlin",
        country: "Germany",
        lat: 52.5108850,
        lon: 13.3989367
    },
    {
        id: 2,
        city: "Jakarta",
        country: "Indonesia",
        lat: 52.5108850,
        lon: 13.3989367
    },
]

// Set localStorage
if(!localStorage.getItem("cities")){
    localStorage.setItem("cities", JSON.stringify(defaultCity));
}

// Add City
submitAddCityButton.addEventListener("click", async () => {
    const city = cityInput.value.toLowerCase();

    if(!city){
        alert("Please check your input");
        return;
    }

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1`);

        if(!response.ok){
            throw new Error(`Error : ${response.status}`)
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log(`Fetch failed:`, error.message);
    }

})


