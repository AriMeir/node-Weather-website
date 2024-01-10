const express = require('express');
const path = require('path');
const axios = require('axios');
const hbs = require('hbs')

const app = express();
const port = process.env.PORT || 3000
//Define paths for Express config
const viewsDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates','views');
const partialsPath = path.join(__dirname,'..','templates', 'partials')

// Setup static directory to serve
app.use(express.static(viewsDirectoryPath));

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ari meir'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Ari meir'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helptext: "This is just a text for helping poor people",
        name: "Ari Meir"
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title : "Error page",
        name : "Ari Meir",
        errorMessage: "page could not be found"
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Must provide an address"
        })
    }
    const url = 'http://api.weatherstack.com/forecast?units=m'
    const params = {
        access_key: 'd3e42f3b19cdfa0537b3fb6cb1d2831a',
        query: req.query.address
      }
      axios.get(url,{params, responseType: 'json'})
  .then(response => {
    const apiResponse = response.data;
    if(apiResponse.error){
        res.send({
            error: "please provide a legit address"
            
            
        })
    } else {
        
        const {weather_descriptions , cloudcover} = apiResponse.current
        const {country, name} = apiResponse.location
        debugger
        res.send({
            forcast: `The weather is ${weather_descriptions[0]
            }, Current temperature in ${name} is ${apiResponse.current.temperature}℃  and there is ${cloudcover
            }% chance of rain`,
            country: country,
            address: req.query.address
            
            
        })
    }  
  }).catch(error => {
    console.log(error)
  });
  
   
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    } 
        res.send({
            products: []
        })
    
    
})


app.get('*', (req,res) => {
    res.render('404', {
        title : "404",
        name : "Ari Meir",
        errorMessage: "page could not be found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port);
});
