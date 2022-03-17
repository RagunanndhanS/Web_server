const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const URL = 'http://api.weatherstack.com/current?access_key=3d242ed2ca5450b1dddef3f170cfe5d0&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: URL, json: true }, (error, response) => {
        if (error) {
            callback('Some network error occured ', undefined)
        } else if (response.body.error) {
            callback('unable to find the location', undefined)
        } else {
            const data = response.body.current
            callback(undefined, 'Your location has a temperature of ' + data.temperature + ' farenheat  and it feels like ' + data.feelslike + " farenheat and it will be " + data.weather_descriptions[0])
        }
    })
}
module.exports = forecast

