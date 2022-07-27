//dependencies config
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose')
const app = express();
const weatherD = [];
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

//root route
app.get('/', function(req, res){

//render weatherdetails
res.render('Index', {Weatherdetails:weatherD} )
});

// post from root route
app.post('/' , function(req, res){
  // passing data from client side
  var cityName = req.body.cityName;
    const query = cityName

  const units = 'metric'
  const apiKey ='3117d90ffe45ff5ac454f8a9eda5d3b9'
//fetching weather details from openweathermap server

  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&units='+ units +'&appid='+ apiKey;
  https.get( url , function(response){
    response.on('data', function(data){
      const weatherData= JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const arrOfObj = {
        location: cityName,
        temp:  weatherData.main.temp +'c',
        weatherDescription: weatherData.weather[0].description,
        imgUrl: 'http://openweathermap.org/img/wn/'+ icon +'@2x.png'
      }
       weatherD.push(arrOfObj)
      res.redirect('/')
    })
  })

})


app.listen(3000, function(){
  console.log('server is running')
})
