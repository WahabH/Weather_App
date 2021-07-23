const path = require('path')
const express = require('express')
const { dirname } = require('path')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name:"Hamood Wahab"
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: "About Us",
        name:"Slim SHady"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {title: "Help Page",
name: "BATMAN"})
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: "Please provide an address"})
    }
    

    geocode(req.query.address, (error,{latitude, longitude, Place}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                Place, 
                address:req.query.address
            })
        })
    })
})





app.get('*',(req, res)=>{
    res.render('404',{
        name:"Wahab",
        title:404,
        errorMessage:"Page not Found"
    })



})
app.listen(3000, () => {
    console.log('Server has started')
})