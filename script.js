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
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}

function onError (error) {
    weatherLocation.innerText = 'You must permit your browser to access your current location'
    console.error(error)
}

