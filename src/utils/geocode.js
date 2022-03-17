const request = require('request')

const geocode = (searchStr, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(searchStr) + ".json?access_token=pk.eyJ1IjoicmFndW5hbm5kaGFuIiwiYSI6ImNrejE5YWN4bTFrNzcycHFsc2dsNzZ2djgifQ.yGiU2dUneF6qnlX0NgzWGg&limit=1"
    request({ url: geocodeURL, json: true }, (error, response) => {
        if (error) {
            callback('Some error is occured in fetching the GeocodeData', undefined)
        } else if (response.body.features.length === 0) {
            callback('Location Not Found. Try another Location', undefined)
        } else {
            const data = response.body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    })
}
module.exports = geocode





// request({ url: geocodeURL, json: true }, (error, response) => {
//     if (error) {
//         console.log('some error occurs in fetching the location')
//     } else if (response.body.features.length ===0) {
//         console.log('location not found')
//     }
//     else{
//     const data = response.body.features[0].center
//     const lattitude = data[0];
//     const longitude = data[1];
//     console.log(lattitude, longitude)
//     }
// })