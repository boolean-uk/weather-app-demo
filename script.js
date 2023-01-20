// query the page to retrieve DOM elements
const htmlElement = document.documentElement;
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const descriptionElement = document.querySelector('.description');

navigator.geolocation.getCurrentPosition(onSuccess, onError)

function onSuccess (data) {
    const lat = data.coords.latitude
    const lon = data.coords.longitude

    const ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = '6173e6646d88596bf16603decfee950c';
    const UNITS = 'metric';
    const LANG = 'en';

    const url = `${ENDPOINT}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}&lang${LANG}`

    fetch(url)
        .then(function(res) { return res.json() })
        .then(function(data) {
            // Extract needed data
            const locationName = data.name;
            const temperature = Math.floor(data.main.temp);
            const iconCode = data.weather[0].icon;
            const description = data.weather[0].description;

            // update DOM
            weatherIcon.alt = description;
            weatherIcon.src = `images/${iconCode}.png`;
            weatherLocation.innerText = locationName;
            weatherTemperature.innerText = `${temperature}°`;
            descriptionElement.innerText = getDescription(iconCode);

            // remove animations
            htmlElement.classList.remove('js-loading');
        })
}

function onError (error) {
    weatherLocation.innerText = 'You must permit your browser to access your current location'
    console.error(error)
}

// a list of weather descriptions stored by key that corresponds to the Open Weather Map API response data
const descriptions = {
    '01d': 'Remember to apply suncream!',
    '01n': 'Good night!',
    '02d': 'Variable...',
    '02n': 'Beware werewolves...',
    '03d': 'Perfect lighting for photos!',
    '03n': 'Sleep well :)',
    '04d': 'Today: a case of the classic British overcast sky :)',
    '04n': 'So cloudy, you won\'t even see the moon!',
    '09d': 'You might need a brolly.',
    '09n': 'Cover up well today',
    '10d': 'You\'ll need two umbrellas',
    '10n': 'Don\'t expose bare skin to the sun!',
    '11d': 'Wear rubber boots!',
    '11n': 'Might be one or two sparks in the sky',
    '13d': 'Weather for snow-men and snow-angels.',
    '13n': 'Perfect night to be under the stars outside!',
    '50d': 'Fog lights should be on!',
    '50n': 'Drive carefully!',
}

// function to retrieve the correct description
function getDescription(iconCode) {
    return descriptions[iconCode];
}

