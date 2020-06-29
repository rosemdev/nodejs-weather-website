const getData = require('./getData');

const geocode = (cityName, callback) => {
    const geocodingOptions = {
      apiKeyCode: "pk.eyJ1Ijoicm9tYW5uYSIsImEiOiJja2JzdW9tbGMwM29iMnhvdmdxZGhmNDhjIn0.3-JZGDcFWrSd_ZaR15LEtQ",
      cityName: encodeURIComponent(cityName),
      limit: 1,
      get url() {
        return `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.cityName}.json?access_token=${this.apiKeyCode}&limit=${this.limit}`;
      }
    }   
  
    getData(geocodingOptions.url, (error, {features} = []) => {
      
      if(error) {
        return callback(error, undefined);
       
      } else if(features.length === 0){
           
        return callback('Unable to get location! Try another search!', undefined);  
  
      } else {
        callback(undefined, {
          lat: features[0].center[1],
          lon: features[0].center[0],
          location: features[0].place_name,
        });
      }
    });
  }


 module.exports = geocode;