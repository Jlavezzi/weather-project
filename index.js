const express = require('express');

const https = require('https')

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res){

res.sendFile(__dirname +'/index.html')
});

app.post('/' , function(req, res){
  var cityName = req.body.cityName;

  const query = cityName
  const units = 'metric'
  const apiKey ='3117d90ffe45ff5ac454f8a9eda5d3b9'

  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&units='+ units +'&appid='+ apiKey;
  https.get( url , function(response){
    response.on('data', function(data){
      const weatherData= JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl ='http://openweathermap.org/img/wn/'+ icon +'@2x.png'

      res.write('<h1>the temperature in' + query + ' is' + temp +'</h1>');
      res.write(weatherDescription);
      res.write('<img src =' +imgUrl + '>');
      res.send()
    })
  })


  console.log(cityName)
})


app.listen(3000, function(){
  console.log('server is running')
})
