const http = require('http');

const fs = require('fs');

const requests = require('requests');
// const {}

const weatherhtml = fs.readFileSync('weather.html', 'utf-8');

const replaceVal = (weatherhtml, apiVal) => {

    // accessing temperature from api data
    const { main: { temp: tempFar, temp_min: minTemp, temp_max: maxTemp }, name: location } = apiVal;
    const tempCal = (tempFar - 32) * 5 / 9;

    let updatedWeatherHtml = weatherhtml.replace('{%tempvalue%}', tempCal);
    // updatedWeatherHtml = updatedWeatherHtml.replace('');
    return updatedWeatherHtml;

}

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        requests(
            "http://api.openweathermap.org/data/2.5/weather?q=Ludhiana&appid=3f2fc6590fd49a886500d3f35c92fb26",
        )

            // when data is available
            .on('data', chunk => {

                const jsonDataObj = JSON.parse(chunk);
                const arrJsonData = [jsonDataObj];

                let realTimeData = arrJsonData.map(dataObj => replaceVal(weatherhtml, dataObj));
                realTimeData = realTimeData.join("");
                // console.log(realTimeData);
                res.write(realTimeData);
            })
            .on('end', err => {
                if (err) console.log('connection closed due to erros', err);
                res.end();
            });
    } else {
        console.log('page not found');
    }

});

server.listen('4100', '127.0.0.1', () => {
    console.log('We are not dumb');
})


































































