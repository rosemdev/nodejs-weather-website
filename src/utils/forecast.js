const getData = require('./getData');

const forecast = (lat, lon, callback) => {
  const weatherOptions = {
    apiKeyCode: "6321ee0f4c9a14744bb79d5629e406c3",
    lat: lat,
    lon: lon,
    units: 'metric',
    get url() {
      return `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&units=${this.units}&appid=${this.apiKeyCode}`;
    },
  }

  getData(weatherOptions.url, (error, data) => {
    if (error) {
      return callback(error, undefined);

    } else if (data.cod) {
      return callback(data.message, undefined);

    } else {
      callback(undefined, data.hourly[0]);
    }
  });
}

module.exports = forecast;
