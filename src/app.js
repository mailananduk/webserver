const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getWeatherInfo = require('./utils/weather')

const app = express();
const port = process.env.PORT || 3000;

//path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialViewsPath = path.join(__dirname, '../templates/partials');

//handlebar engin and view location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialViewsPath);

//setup static dir to serve
app.use(express.static(publicDirPath));

app.get('/', (req, rsp)=>{
    rsp.render('index', {
        pageTitle:'Weather',
        title:'Weather',
        name:'Anand'
    });
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        pageTitle:'Help',
        title:'Help',
        helpText:'You get some hepl here!',
        name:'me'
    });
})

app.get('/about', (req, resp) =>{
    resp.render('about', {
        pageTitle:'About',
        title:'About',
        name:'us'
    });
})
app.get('/weather', (req, resp) => {
    //check param http://localhost:3000/weather?city=chennai,in
    if (!req.query.city) {
        return resp.send({
            error: 'Search city not provided'
        })
    }
    getWeatherInfo(req.query.city, (error, {weather, main}={}) => {
        if(error) {
            return resp.send({
                error: error
            })
        }
        resp.send({
            temperature: main.temp,
            feelsLike: main.feels_like,
            city: req.query.city,
            description: weather[0].description});
    })
        
})


app.get('*', (req, resp) =>{
    resp.render({
        pageTitle:'Error',
        title:'404'
    })
})

app.listen(port, () => {
    console.log('server started at port ' + port)
});


