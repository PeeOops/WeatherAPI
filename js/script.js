const addCityButton = document.getElementById("add-city");
const cancelAddCityButton = document.getElementById("cancel");
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



