const request = require('request');


const getWeatherInfo = (city, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=1b4024774c265067203bfba86d4ac3f7`;
    request.get({url:url, json:true}, (error, response, body) =>{
        if (error) {
            return callback('Cannot get weather info, server issue');
        }
        if(body.cod!=200) {
            return callback(body.message);
        }
        callback(undefined, body);
    })
}

module.exports = getWeatherInfo;