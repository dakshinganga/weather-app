//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request");

const forecast = (address, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=e82c126c5ec4ffa06ba081ae1147bb8f&query=${address}`;

	request({ url, json: true }, (error, { body }) => {
		if (body.error) {
			callback(body.error.info, undefined);
		} else {
			callback(undefined, body);
		}
	});
};

module.exports = forecast;
