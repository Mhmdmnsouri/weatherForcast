const apiKey = 'e494315ed06d203bde08043bd7f53d9f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.searchContainer input');
const searchBtn = document.querySelector('.searchContainer button');
const weatherIcon = document.querySelector('.weather img');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    } else {
        let data = await response.json();
        console.log(data);

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/clouds.png';
        }
        else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/clear.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rain.png';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = 'images/drizzle.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png';
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';

    }


}
checkWeather();

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
})