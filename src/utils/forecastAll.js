const request = require("request");

const forecastAll = (latitude, longitude, callback) => {
  const key1 = "2514c9d7feee820b97246a73d7b32858";
  const key2 = "dc0b4138293f9e51a5aa484c5794df5a";
  const url = `http://api.weatherstack.com/current?access_key=${key2}&query=${latitude} ${longitude}&units=m`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, body.current);
    }
  });
};

module.exports = forecastAll;
