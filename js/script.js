
const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#search-btn");
const deleteSearch = document.querySelector("#delete-search");
const deggree = document.querySelector(".deggree");
const statusName = document.querySelector(".status");
const areaName = document.querySelector(".area-info");
const minMaxValue = document.querySelector(".min-max");



/* =========================  EVENTS  =============================================  */


searchBar.addEventListener("focus",() => {
    deleteSearch.classList.add("active");
})

deleteSearch.addEventListener("click",() => {
    if (!searchBar.value == "") {
        searchBar.value = "";
        searchBar.focus();
    }else {
        alert("Arama kutusu şu anda bos")
    }
})
searchBtn.addEventListener("click",() => {

    let val = searchBar.value;
    getCityWeather(val);
})
window.addEventListener("load",() => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
});

searchBar.addEventListener("keypress",(e) => {
    if ( e.keyCode == '13' ) {
        searchBtn.click();
    }
})

/* =========================== FUNCTIONS  ================================================== */



async function getCityWeather(area) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${area}&limit=100&appid=cadbf079082a263852e8460b39accacd`);
        const data = await response.json();
        console.log(data[0].name);
        console.log(data[0].lat);
        console.log(data[0].lon);
        const cityLatitude = data[0].lat;
        const cityLongitude = data[0].lon;

        const respnse1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLatitude}&lon=${cityLongitude}&appid=cadbf079082a263852e8460b39accacd&units=metric&lang=tr`);
        const data1 = await respnse1.json();
        console.log(data1);
        deggree.innerText = Math.round(data1.main.temp) + "°C";
        areaName.innerText = data1.name + "," + data1.sys.country;
        statusName.innerText = data1.weather[0].description;
        minMaxValue.innerText = Math.round(data1.main.temp_min) + "°C" + " / " + Math.round(data1.main.temp_max) + "°C";
    }catch(err) {
        console.log(err);
    }
}
async function onSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    let response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=fda633cc3cfd477e9fddba8dd1bf3b48`);
    let data = await response.json();
    const location = data.results[0].components.province;
    getCityWeather(location);
}
function onError(err) {
    console.log(err);
}
