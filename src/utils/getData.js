const https = require('https');


function getData(url, callback) {
    https.get(url, (resp) => {
        let data = '';
      
      
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {         
          let parsedData = JSON.parse(data);
          callback(undefined, parsedData);
        });   

      
      }).on("error", (err) => {
               
        console.log("Error: " + err.message + ' Unable to connect to the servise');
        callback(err, undefined);
      });
}


module.exports = getData;


