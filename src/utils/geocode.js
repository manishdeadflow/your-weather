const request = require("request");

const geocode = (place, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    place
  )}.json?access_token=pk.eyJ1IjoibWFuaXNoZGVhZGZsb3ciLCJhIjoiY2t0OGN1dzZlMTFhYzJwanBsZTY3ZzgxaCJ9.y3Ut4PFb2XdDRP29wkNpLQ&limit=1`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to location service!", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find the location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
