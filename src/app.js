const express = require('express');
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express();
//Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

const port = process.env.PORT||3001
const partialssPath = path.join(__dirname, '../templates/partials')
    //setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialssPath)

// setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ragu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Ragu',
        contact: 7598969189
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'I Will Help You',
        title: 'Help Page',
        name: 'Ragu'

    })
})

app.get('/products', (req, res) => {
    if (!req.query.name) {
        return res.send({
            error: 'you must provide a name'
        })
    }

    res.send({
        products: 'no products',
        query: req.query
    })
})


app.get('/weather', (req, res) => {


    if (!req.query.address) {
        return res.send({
            error: 'you must provide a address in query'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: data,
                location:location,
                Searchedlocation : req.query.address
            })
        })
    })
})





app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article Not found',
        title: '404',
        name: 'Ragu'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Ragu'
    })
})

///app.com
//app.com/help
//app.com/about

app.listen(port, () => {
    console.log('Server is up on port',port)
})









// app.get('', (req, res) => {
//     res.send('<h1>Hellow Node.js</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//             name: 'ragu',
//             age: 27
//         },
//         {
//             name: 'rrr',
//             age: '22'
//         }
//     ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1> about</h1>')
// })