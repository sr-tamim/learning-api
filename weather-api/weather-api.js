// location api
navigator.geolocation.getCurrentPosition(getWeather);


function getWeather(position) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=79318109f33df61d79f879497f630568`;

    fetch(url)
        .then(Response => Response.json())
        .then(data => showWeather(data));
}

function showWeather(data) {
    console.log(data)
    document.getElementById('weather-details').innerHTML = `
        <h5>${data.timezone}</h5>
        <h1 class='display-2 fw-bold mb-1'>${data.current.temp}℃</h1>
        <h5 class='mb-3'>Feels Like: ${data.current.feels_like}℃</h5>
        <h1>
            ${data.current.weather[0].main}
            <img src="${'https://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png'}" style="filter:invert(100%)">
        </h1>
        <h4>Humidity = ${data.current.humidity}%</h4>
        <h4 class='mb-0'>Wind speed = ${(data.current.wind_speed * 3.6).toPrecision(3)} km/h</h4>
        <h4 class='mb-3'>Wind direction = ${data.current.wind_deg}°</h4>
        <h4 class='mb-0'>Sunrise = ${new Date(data.current.sunrise * 1000).getHours()}:${new Date(data.current.sunrise * 1000).getMinutes()}am</h4>
        <h4 class='mb-3'>Sunset = ${new Date(data.current.sunset * 1000).getHours() - 12}:${new Date(data.current.sunset * 1000).getMinutes()}pm</h4>`
}