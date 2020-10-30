console.log('Javascript file is loaded.');


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-address')
const message2 = document.querySelector('#message-weather')


weatherForm.addEventListener('submit', (e) => {

    //This function let everything in their state and lets us do what we want from the document.
    e.preventDefault()
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(search.value)).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                // console.log(data.error);
                message1.textContent = data.error
                message2.textContent = ''
            } else {
                // console.log(data.location);
                // console.log(data.temp);
                // console.log(data.humidity);
                // console.log(data.wind_speed);
                message1.textContent = 'Location: ' + data.location
                message2.textContent = `
                Temperature: ${data.temp}°C
                Humidity: ${data.humidity}%
                Wind Speed: ${data.wind_speed} km/h`
            }
        })
    })
    // const address = search.value;
    // console.log(address);
})