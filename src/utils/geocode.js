const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiaHdhaGFiIiwiYSI6ImNrcmMybThvejR6OTkycG82MmhyOXcwbHcifQ.l5P20GJnFzP0KhXqc8Tu2w&limit=1'
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0){
            callback('Could not find the location', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                Place: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode
