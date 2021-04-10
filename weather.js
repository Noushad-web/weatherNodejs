const http = require('http');
const fs = require('fs');
const requests = require('requests');
// const {}

const weatherhtml = fs.readFileSync('weather.html', 'utf-8');

const replaceVal = (weatherhtml, apiVal) => {
    // new html file 
    let tempFar = apiVal.main.temp;
    let tempCal = (tempFar - 32) * 5 / 9;
    let updatedWeatherHtml = weatherhtml.replace('{%tempvalue%}', tempCal);
    fs.writeFile('weather.html', updatedWeatherHtml, (err) => {
        // console.log(err);
    })
}

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests(
            "http://api.openweathermap.org/data/2.5/weather?q=Antarctica&appid=3f2fc6590fd49a886500d3f35c92fb26",
        )
            .on('data', function (chunk) {
                let weatherdataObj = JSON.parse(chunk);
                let arrData = [weatherdataObj];
                console.log(chunk);
                let newArrData = arrData.map((val) => {
                    replaceVal(weatherhtml, val);
                }) 
            
            })
            .on('end', function (err) {
                if (err) console.log('connection closed due to erros', err);            
                console.log('end');
            });
    } else {
        console.log('page not found');
    }

});

server.listen('4100' , '127.0.0.1' , () => {
    console.log('We are not dumb');
})


































































