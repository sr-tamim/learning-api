// location api
navigator.geolocation.getCurrentPosition(getWeatherFromCoords);

const searchField = document.getElementById('inputField');
const container = document.getElementById('weather-details');


function getWeatherFromCoords(position) {
    container.innerHTML = 'Loading...';

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=79318109f33df61d79f879497f630568`;

    fetch(url)
        .then(Response => Response.json())
        .then(data => showWeatherFromLocation(data));
}


function showWeatherFromLocation(data) {
    let currentTime;
    if (new Date().getHours() < 12) {
        currentTime = new Date().getHours() + ':' + new Date().getMinutes() + 'am';
    } else if (new Date().getHours() === 0) {
        currentTime = '12:' + new Date().getMinutes() + 'am';
    } else {
        currentTime = new Date().getHours() - 12 + ':' + new Date().getMinutes() + 'pm';
    }

    container.innerHTML = `
        <h5>${data.timezone}</h5>
        <h1 class='display-2 fw-bold mb-1'>${data.current.temp}℃</h1>
        <h5 class='mb-3'>Feels Like: ${data.current.feels_like}℃</h5>
        <h1>
            ${data.current.weather[0].main}
            <img src="${'https://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png'}">
        </h1>
        <h4>Humidity = ${data.current.humidity}%</h4>
        <h4 class='mb-0'>Wind speed = ${(data.current.wind_speed * 3.6).toPrecision(3)} km/h</h4>
        <h4 class='mb-3'>Wind direction = ${data.current.wind_deg}°</h4>
        <h4 class='mb-0'>Sunrise = ${new Date(data.current.sunrise * 1000).getHours()}:${new Date(data.current.sunrise * 1000).getMinutes()}am</h4>
        <h4 class='mb-3'>Sunset = ${new Date(data.current.sunset * 1000).getHours() - 12}:${new Date(data.current.sunset * 1000).getMinutes()}pm</h4>
        <h5>Current Time = ${currentTime}`
}


async function getWeatherFromName() {
    const searched = searchField.value;
    if (searched == '') {
        alert('Fill up input field first');
        return;
    }
    // clear input field
    searchField.value = '';

    container.innerHTML = 'Loading...';

    let areaName = searched.toLowerCase();
    if (areaName.indexOf(',') != -1) {
        areaName = searched.split(' ').join('');
    }
    else {
        areaName = searched.split(' ').join(',');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${areaName}&units=metric&appid=79318109f33df61d79f879497f630568`
    const response = await fetch(url);
    const data = await response.json();
    showWeatherFromInput(data);
}


function showWeatherFromInput(data) {

    // when no city found
    if (data.cod === '404') {
        container.innerHTML = data.message;
    }

    let currentTime;
    if (new Date().getUTCHours() + parseInt(data.timezone / 3600) <= 12) {
        currentTime = new Date().getUTCHours() + parseInt(data.timezone / 3600) + ':' + (new Date().getUTCMinutes() + (data.timezone % 3600)) + 'am';
    } else if (new Date().getUTCHours() + parseInt(data.timezone / 3600) === 0) {
        currentTime = '12:' + (new Date().getUTCMinutes() + (data.timezone % 3600)) + 'am';
    }
    else if (new Date().getUTCHours() + parseInt(data.timezone / 3600) < 24) {
        currentTime = (new Date().getUTCHours() + parseInt(data.timezone / 3600) - 12) + ':' + (new Date().getUTCMinutes() + (data.timezone % 3600)) + 'pm';
    } else {
        currentTime = (new Date().getUTCHours() + parseInt(data.timezone / 3600) - 24) + ':' + (new Date().getUTCMinutes() + (data.timezone % 3600)) + 'am';
    }

    container.innerHTML = `
        <h5>${data.name + ', ' + data.sys.country}</h5>
        <h1 class='display-2 fw-bold mb-1'>${data.main.temp}℃</h1>
        <h5 class='mb-3'>Feels Like: ${data.main.feels_like}℃</h5>
        <h1>
            ${data.weather[0].main}
            <img src="${'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png'}">
        </h1>
        <h4>Humidity = ${data.main.humidity}%</h4>
        <h4 class='mb-0'>Wind speed = ${(data.wind.speed * 3.6).toPrecision(3)} km/h</h4>
        <h4 class='mb-3'>Wind direction = ${data.wind.deg}°</h4>
        <h4 class='mb-0'>Sunrise = ${new Date(data.sys.sunrise * 1000).getHours()}:${new Date(data.sys.sunrise * 1000).getMinutes()}am</h4>
        <h4 class='mb-3'>Sunset = ${new Date(data.sys.sunset * 1000).getHours() - 12}:${new Date(data.sys.sunset * 1000).getMinutes()}pm</h4>
        <h5>Current Time = ${currentTime}`;
}