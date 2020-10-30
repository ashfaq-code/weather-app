//Start nodemon with multiple extentions will restart server on changes in mentioned extensions
// In this file: nodemon src/app.js -e js, hbs (-e : extension)
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const {
    response
} = require('express')

const app = express()
// Setup for Heroku 
// If found the port at heroku, 3000 otherwise
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

//Visit home page
app.get('', (req, res) => {
    res.render('index', {
        name: 'Ashfaq Ahmad',
        indexTitle: 'Express Home',
        title: 'Weather App',
    })
})
//Visit about page
app.get('/about', (req, res) => {
    res.render('about', {
        aboutTitle: 'Express About',
        aboutPara: 'This paragraph is about us.',
        title: 'Weather App About: Dynamic'

    })
})
//Visit sub pages of about which are not exist 
app.get('/about/*', (req, res) => {
    res.render('404', {
        title: 'About notes not found!',
    })
})
//Visit help page
app.get('/help', (req, res) => {
    res.render('help', {
        aboutTitle: 'Express About',
        aboutPara: 'This paragraph is about us.',
        title: 'Weather App Help: Dynamic'

    })
})
//Visit sub pages of help which are not exist
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found!'
    })
})

//Visit Weather page to check forecast
// let weatherForecast = {};
app.get('/weather', (req, res) => {

    console.log(req.query.address);
    const query = req.query.address
    
    if (!query) {
        return res.send({
            error:'You must provide an address to check the weather out!',
        })
    } else {
        geocode(query, (error, {latitude, longitude, location} = {}) => {
            
            if (error) {
                return res.send({ error })
            } else if (!error) {
                
                forecast(latitude, longitude, (error, {body:{current:weatherForecast}} = {}) => {
                    if (error) {
                        return res.send({ error })
                    } else if (!error) {
                        // weatherForecast = fResponse.body.current
                        res.send({
                            location,
                            temp: weatherForecast.temp,
                            humidity: weatherForecast.humidity,
                            wind_speed: weatherForecast.wind_speed,
                        })
                        // console.log(weatherForecast);
                    }
                })
            }
        })
    }
})

//Visit any other pages which is not mentioned above.
app.get('/*', (req, res) => {
    res.render('404', {
        title: 'Page not found!'
    })
})

//Start the Server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})