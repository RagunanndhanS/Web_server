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
            const directionexp = {
                E: 'East',
                W: 'West',
                N: 'North',
                S: 'South'
            }
            let direction = ''
            data.wind_dir.split('', '4').forEach((dir) => {direction=direction+' '+directionexp[dir]})
         
            callback(undefined, 'Your location has a temperature of ' + data.temperature + ' farenheat, it will feel like ' + data.feelslike + " farenheat. Today's climate will be " + data.weather_descriptions[0] + ". Humidity is " + data.humidity + " %. Wind flow will be " +direction+ " direction with the speed of " + data.wind_speed + "km/h.")
        }
    })
}
module.exports = forecast