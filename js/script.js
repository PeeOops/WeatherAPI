const addCityButton = document.getElementById("add-city");
const cancelAddCityButton = document.getElementById("cancel");
const cityList = document.getElementById("cities");
const content = document.getElementById("content");
const sevenDayForecasts = document.getElementById("forecasts");
const modal = document.getElementById("modal");

addCityButton.addEventListener("click", () => {
    modal.showModal();
})

cancelAddCityButton.addEventListener("click", () => {
    modal.close();
})

