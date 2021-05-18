const express =require("express");
const https =require("https");
// const fs =require("fs");
const bodyparser=require("body-parser");

const app=express();


app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req, res){
res.sendFile(__dirname + "/index.html");
 
});

app.post("/", function(req, res){

    const query= req.body.cityName;
    const apikey="cc9522b662c94aa2a8b4467910123282";
    const units="metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q=" +query +"&appid="+ apikey+"&units ="+ units;
    
    https.get(url, function(response){
        console.log(response.statusCode);

    
        response.on("data", function(data){
            const weatherData= JSON.parse(data);
            const temp= weatherData.main.temp;
            const weatherDescription= weatherData.weather[0].discription;
            const icon= weatherData.weather[0].icon;
            const imageUrl= "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            res.write("<p> The weather is currently"+ weatherDescription +"</p>");
            res.write("<h1> The temp in "+ query+" is "+ temp + "degree F </h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
        
    })
    

})

app.listen(3000, (err)=>{
    console.log("port listning 3000");
})