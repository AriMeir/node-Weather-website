const axios = require('axios');

  const getWeather = (address, callback) => {
    const url = 'http://api.weatherstack.com/forecast?units=m'
    const params = {
        access_key: 'd3e42f3b19cdfa0537b3fb6cb1d2831a',
        query: address
      }
      axios.get(url,{params, responseType: 'json'})
  .then(response => {
    const apiResponse = response.data;
    if(apiResponse.error){
        callback("could not find the the city or the input isnt valid",undefined)
    } else {
        const {weather_descriptions , cloudcover} = apiResponse.current
        const {name} = apiResponse.location
        callback(undefined, `The weather is ${weather_descriptions[0]
        }, Current temperature in ${name} is ${apiResponse.current.temperature}℃  and there is ${cloudcover
        }% chance of rain` );
    }
    
  }).catch(error => {
    callback(error,undefined)
  });
  }

  module.exports = getWeather