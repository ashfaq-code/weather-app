console.log('Javascript file is loaded.');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message-address')
const temperature = document.querySelector('#message-weather-1')
const humidity = document.querySelector('#message-weather-2')
const wind_speed = document.querySelector('#message-weather-3')

weatherForm.addEventListener('submit', (e) => {

    //This function let everything in their state and lets us do what we want from the document.
    e.preventDefault()
    message.textContent = 'Loading...'
    temperature.textContent = ''

    fetch('/weather?address=' + encodeURIComponent(search.value)).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                // console.log(data.error);
                message.textContent = data.error
                temperature.textContent = ''
            } else {
                message.textContent = data.location
                temperature.textContent = `Temperature: ${data.temp}°C`
                humidity.textContent = `Humidity: ${data.humidity}%`
                wind_speed.textContent = `Wind Speed: ${data.wind_speed} km/h`

                
            }
        })
    })
})