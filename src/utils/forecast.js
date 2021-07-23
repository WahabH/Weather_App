const request = require('request')

const forecast = (latitude,longitude, callback)=> {
    url = 'http://api.weatherstack.com/current?access_key=408607316c2db1b9406cd7e09503bbf0&query='+latitude+','+longitude
    
    request({url, json: true},(error,{body})=>{
        if (error){
           callback("Cant connect to the Weather API", undefined)
        }else if(body.success===false){
           callback("Cant find the location", undefined)
        }else{
           callback(undefined, "The current weather is "+ body.current.weather_descriptions[0]+". The current temprature is "+body.current.temperature+"."
               
           )
        }
    })
}

module.exports = forecast