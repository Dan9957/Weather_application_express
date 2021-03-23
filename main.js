const express = require('express')
const app = express()
const parser = require('body-parser')
const fetch = require("node-fetch")
const path = require('path')
const port = 8080
/*
api.openweathermap.org/data/2.5/weather?q=London&appid={API key}
*/

//App setting
app.use(express.static('public'))
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))
app.set('views', path.join(__dirname, '/Views/pages/'))
app.set('view engine', 'pug')
//App setting end

app.get('/', (req, res) => {
  res.render("Home", {title:"Home"})
})
app.get('/Weather',(req, res) =>{
  res.render("Weather",{title:"How is Weather"});
});
app.post('/Weather', (req, res) => {
  var sname = req.body.name
    async function api(cname) {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cname}&appid=90d9348ec88f958840cfa9c27b303c23`);
      const answer = await response.json();
      const _json = JSON.parse(JSON.stringify(answer));
      const des = _json.weather[0].description;
      const icon = _json.weather[0].icon;
      const wind = _json.wind.speed;
      var temp = _json.main.temp;
      temp = parseInt(temp-273);
      res.render("City",{cname:sname,des:des,wind:wind,temp:temp,icon:icon});
    }
    return api(sname);
});
app.get('/City',(req, res) =>{
  res.render("City",{title:"City Weather"});
});
//start
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})