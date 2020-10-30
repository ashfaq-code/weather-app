const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&' + 'lon=' + longitude + '&exclude=hourly,daily&units=metric&appid=a89ea12a5587b4c423d3a002154ac822'

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else if (response.body.message === "Nothing to geocode") {
            // log(response.body.daily[0].temp)
            log("Location Not found!")
            callback(error, undefined)
        } else {
            // log(response.body)
            callback(undefined, response)
        }

    })
}

module.exports = forecast;